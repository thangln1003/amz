import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Input, Drawer } from 'antd';
import React, { useState, useRef } from 'react';
import { useIntl, FormattedMessage } from 'umi';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { ModalForm, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import type { ProDescriptionsItemProps } from '@ant-design/pro-descriptions';
import ProDescriptions from '@ant-design/pro-descriptions';
import type { FormValueType } from './components/UpdateForm';
import UpdateForm from './components/UpdateForm';
import type { ToDoItem } from './data.d';
import { queryToDoItem, updateToDoItem, addToDoItem, removeToDoItem } from './service';

/**
 * Add node
 *
 * @param fields
 */
const handleAdd = async (fields: ToDoItem) => {
  const hide = message.loading('Adding');
  try {
    await addToDoItem({ ...fields });
    hide();
    message.success('Added successfully');
    return true;
  } catch (error) {
    hide();
    message.error('Failed to add, please try again!');
    return false;
  }
};

/**
 * Update node
 *
 * @param fields
 */
const handleUpdate = async (fields: FormValueType) => {
  const hide = message.loading('Updating');
  try {
    await updateToDoItem({
      title: fields.title,
      description: fields.description,
      id: fields.id,
    });
    hide();

    message.success('Updated successfully');
    return true;
  } catch (error) {
    hide();
    message.error('Failed to update, please try again!');
    return false;
  }
};

/**
 * Delete node
 *
 * @param selectedRows
 */
const handleRemove = async (selectedRows: ToDoItem[]) => {
  const hide = message.loading('Deleting');
  if (!selectedRows) return true;
  try {
    await removeToDoItem({
      key: selectedRows.map((row) => row.id),
    });
    hide();
    message.success('Deleted successfully，going to refresh');
    return true;
  } catch (error) {
    hide();
    message.error('Failed to delete，please try again');
    return false;
  }
};

const ToDoItemList: React.FC = () => {
  /** Create Popup Window */
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  /** Update Popup Window */
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);

  const [showDetail, setShowDetail] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<ToDoItem>();
  const [selectedRowsState, setSelectedRows] = useState<ToDoItem[]>([]);

  /** International configuration */
  const intl = useIntl();

  const columns: ProColumns<ToDoItem>[] = [
    {
      title: (
        <FormattedMessage
          id="pages.searchTable.updateForm.ruleName.nameLabel"
          defaultMessage="Rule Name"
        />
      ),
      dataIndex: 'title',
      tip: '规则名称是唯一的 key',
      render: (dom, entity) => {
        return (
          <a
            onClick={() => {
              setCurrentRow(entity);
              setShowDetail(true);
            }}
          >
            {dom}
          </a>
        );
      },
    },
    {
      title: <FormattedMessage id="pages.searchTable.titleDesc" defaultMessage="Description" />,
      dataIndex: 'description',
      valueType: 'textarea',
    },
    {
      title: <FormattedMessage id="pages.searchTable.titleStatus" defaultMessage="Status" />,
      dataIndex: 'isDone',
      hideInForm: true,
      valueEnum: {
        'false': {
          text: (
            <FormattedMessage id="pages.todoItem.nameStatus.notDone" defaultMessage="Not Done" />
          ),
          status: 'Default',
        },
        'true': {
          text: (
            <FormattedMessage id="pages.todoItem.nameStatus.done" defaultMessage="Done" />
          ),
          status: 'Success',
        },
      },
    },
    {
      title: <FormattedMessage id="pages.todoItem.titleAction" defaultMessage="Action" />,
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="config"
          onClick={() => {
            handleUpdateModalVisible(true);
            setCurrentRow(record);
          }}
        >
          <FormattedMessage id="pages.todoItem.edit" defaultMessage="Edit" />
        </a>,
        <a key="subscribeAlert" href="https://procomponents.ant.design/">
          <FormattedMessage id="pages.todoItem.delete" defaultMessage="Delete" />
        </a>,
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable<ToDoItem>
        headerTitle={intl.formatMessage({
          id: 'pages.searchTable.title',
          defaultMessage: 'Enquiry Form',
        })}
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleModalVisible(true);
            }}
          >
            <PlusOutlined /> <FormattedMessage id="pages.searchTable.new" defaultMessage="New" />
          </Button>,
        ]}
        request={(params, sorter, filter) => queryToDoItem({ ...params, sorter, filter })}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              <FormattedMessage id="pages.searchTable.chosen" defaultMessage="Chosen" />{' '}
              <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a>{' '}
              <FormattedMessage id="pages.searchTable.item" defaultMessage="Item" />
              &nbsp;&nbsp;
              <span>
                <FormattedMessage
                  id="pages.searchTable.totalServiceCalls"
                  defaultMessage="服务调用次数总计"
                />{' '}
                {selectedRowsState.reduce((pre, item) => pre + item.callNo, 0)}{' '}
                <FormattedMessage id="pages.searchTable.tenThousand" defaultMessage="万" />
              </span>
            </div>
          }
        >
          <Button
            onClick={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            <FormattedMessage id="pages.searchTable.batchDeletion" defaultMessage="Batch Deletion" />
          </Button>
          <Button type="primary">
            <FormattedMessage id="pages.searchTable.batchApproval" defaultMessage="Batch Approval" />
          </Button>
        </FooterToolbar>
      )}
      <ModalForm
        title={intl.formatMessage({
          id: 'pages.searchTable.createForm.newRule',
          defaultMessage: 'New Rule',
        })}
        width="400px"
        visible={createModalVisible}
        onVisibleChange={handleModalVisible}
        onFinish={async (value) => {
          const success = await handleAdd(value as ToDoItem);
          if (success) {
            handleModalVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      >
        <ProFormText
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="pages.searchTable.ruleName"
                  defaultMessage="Rule Name is required"
                />
              ),
            },
          ]}
          width="md"
          name="name"
        />
        <ProFormTextArea width="md" name="desc" />
      </ModalForm>
      <UpdateForm
        onSubmit={async (value) => {
          const success = await handleUpdate(value);
          if (success) {
            handleUpdateModalVisible(false);
            setCurrentRow(undefined);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleUpdateModalVisible(false);
          setCurrentRow(undefined);
        }}
        updateModalVisible={updateModalVisible}
        values={currentRow || {}}
      />

      <Drawer
        width={600}
        visible={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        {currentRow?.title && (
          <ProDescriptions<ToDoItem>
            column={2}
            title={currentRow?.title}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.title,
            }}
            columns={columns as ProDescriptionsItemProps<ToDoItem>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default ToDoItemList;

