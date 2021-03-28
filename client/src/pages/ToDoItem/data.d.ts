export type ToDoItem = {
    id: number;
    title: string;
    description: string;
    isDone: boolean;
  };
  
  export type TableListPagination = {
    total: number;
    pageSize: number;
    current: number;
  };
  
  export type TableListData = {
    list: TableListItem[];
    pagination: Partial<TableListPagination>;
  };
  
  export type TableListParams = {
    id?: number;
    title?: string;
    description?: string;
    isDone?: boolean;
    pageSize?: number;
    currentPage?: number;
    filter?: Record<string, any[]>;
    sorter?: Record<string, any>;
  };
  