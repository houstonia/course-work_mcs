import { Model, Table, DataType, Column } from 'sequelize-typescript';

interface AdsCreationAttrs {
  title: string;
  price: string;
  description: string;
  address: string;
  photos: string[];
  property_type: string;
  area: number;
  amenities: string;
  contact_info: string;
  posting_date: Date;
  status: string;
}

@Table({ tableName: 'Ads' })
export class Ads extends Model<Ads, AdsCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  title: string;

  @Column({ type: DataType.STRING, allowNull: false })
  price: string;

  @Column({ type: DataType.STRING })
  description: string;

  @Column({ type: DataType.STRING })
  address: string;

  @Column({ type: DataType.ARRAY(DataType.STRING) })
  photos: string[];

  @Column({ type: DataType.STRING })
  property_type: string;

  @Column({ type: DataType.INTEGER })
  area: number;

  @Column({ type: DataType.STRING })
  amenities: string;

  @Column({ type: DataType.STRING })
  contact_info: string;

  @Column({ type: DataType.DATE })
  posting_date: Date;

  @Column({ type: DataType.STRING })
  status: string;
}
