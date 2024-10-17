export type CartData = {
  _id: string;
  cart_no: string;
  status: string;
  price: number;
  discount: number;
  course_id: string;
  student_id: string;
  instructor_id: string;
  created_at: Date;
  updated_at: Date;
  is_deleted: boolean;
  course_name: string;
  student_name: string;
  instructor_name: string;
  price_paid: number;
};

export type DataTransfer = {
  searchCondition: {
    status: string;
    is_deleted: boolean;
  };
  pageInfo: {
    pageNum: number;
    pageSize: number;
  };
};

export type CartSearchResponse = {
  success: boolean;
  data: {
    pageData: CartData[];
    pageInfo: {
      pageNum: number;
      pageSize: number;
      totalItems: number;
      totalPages: number;
    };
  };
};