export interface Role {
  id: number;
  name: string;
  createdBy: string;
  createdOn: Date;
  permissions: number[];
}
