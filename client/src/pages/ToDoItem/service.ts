import request from '@/utils/request';
import type { TableListParams, ToDoItem } from './data.d';

export async function queryToDoItem(params?: TableListParams) {
  return request('/api/rule', {
    params,
  });
}

export async function removeToDoItem(params: { key: number[] }) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addToDoItem(params: ToDoItem) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateToDoItem(params: TableListParams) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'update',
    },
  });
}
