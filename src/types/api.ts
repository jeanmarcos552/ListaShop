export interface ApiResponse {
  // status: 200 | 201 | 400 | 403 | 404 | 500;
  status: number;
}
export interface ApiResponseWithPaginate {
  status: number;
  current_page: number;
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: [
    {
      url?: string;
      label: string;
      active: boolean;
    },
    {
      url: string;
      label: string;
      active: boolean;
    },
    {
      url?: string;
      label: string;
      active: boolean;
    },
  ];
  next_page_url?: string;
  path: string;
  per_page: number;
  prev_page_url?: string;
  to: number;
  total: number;
}
