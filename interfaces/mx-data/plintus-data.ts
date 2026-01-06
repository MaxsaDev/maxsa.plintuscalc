export interface PlintusData {
  id: string;
  plintus_types_id: number;
  product_id: number;

  title: string;
  image_path: string;

  price: string;
  weight: string;
  length: string;
  width: string;
  height: string;

  created_at: Date;
  updated_at: Date;
}
