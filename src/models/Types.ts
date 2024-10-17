import { ReactNode } from "react";
// import { CourseDetail } from "./Course";

export type SiderContextType = {
  collapsed: boolean;
  toggleSider: () => void;
};
// Auth
export type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  setUser: (user: User) => void;
  getRole: () => string | null;
};

// User
export type User = {
  data: {
    _id: string;
    email: string;
    google_id: string;
    password: string;
    role: string;
    name: string;
    dob: string;
    phone_number: string;
    address: string;
    avatar: string;
    video: string;
    status: boolean;
    created_at: string;
    updated_at: string;
    balance_total: number;
    balance_account: string;
    balance_name: string;
    transactions: {
      _id: string;
      payout_id: string;
      payout_no: string;
      payout_amount: string;
      created_at: string;
    };
  };
};

export type SearchCondition = {
  keyword?: string;
  role: string;
  status: boolean;
  is_verified: boolean;
  is_delete: boolean;
};

export type PageInfo = {
  pageNum: number;
  pageSize: number;
};

export type UserData = {
  _id: string;
  name: string;
  email: string;
  google_id: string;
  role: string;
  status: boolean;
  description: string;
  phone_number: string;
  avatar: string;
  video: string;
  dob: string;
  created_at: string;
  updated_at: string;
  is_deleted: boolean;
  is_verified: boolean;
  balance_total: number;
  balance_account: string;
  balance_name: string;
  transactions: {
    _id: string;
    payout_id: string;
    payout_no: string;
    payout_amount: string;
    created_at: string;
  };
};

export type UserDetailProp = {
  _id: string;
};

export type UserSearchResponse = {
  success: boolean;
  data: {
    totalCount: any;
    pageData: UserData[];
    pageInfo: {
      pageNum: number;
      pageSize: number;
      totalItems: number;
      totalPages: number;
    };
  };
};

export type UserSearchRequest = {
  searchCondition: SearchCondition;
  pageInfo: PageInfo;
};

export type ApiResponse = {
  success: boolean;
  data: {
    pageData: UserData[];
    pageInfo: {
      pageNum: number;
      pageSize: number;
      totalItems: number;
      totalPages: number;
    };
  };
};

// Category

// Course
export type SiderProviderProps = {
  children: ReactNode;
};

export type HelpSubTabProps = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

export type CourseBoxProps = {
  courseData: {
    title: String;
    description: string;
  };
};

// export type CourseSubTabProps = {
//   _id: string;
//   activeTab: string;
//   setActiveTab: (tab: string) => void;
//   onSelectedCourse: (id: string) => void;
//   content: CourseDetail["content"];
//   sessions: CourseDetail["session_list"];
// };

export type CourseHelpProps = {
  helpData: {
    title: String;
  };
};

export type HelpCardProps = {
  iconClass: string;
  title: string;
  description: string;
};

export type InstructorChannelProps = {
  instructor: string;
  students: number;
  likes: number;
  dislikes: number;
  shares: number;
};

export type Course = {
  id: string;
  courseName: string;
  categoryName: string;
  instructorName: string;
  image: string;
  price: number;
};

export type SignUpPayload = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
};

export type SignUpFormValues = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
};

export type ExtendedJwtPayload = {
  email: string;
  name: string;
  role: string;
  picture: string;
};
