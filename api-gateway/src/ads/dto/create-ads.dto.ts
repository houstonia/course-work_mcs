export class CreateAdsDto {
  readonly title: string;
  readonly price: string;
  readonly description: string;
  readonly address: string;
  readonly photos: string;
  readonly property_type: string;
  readonly area: number;
  readonly amenities: string;
  readonly contact_info: string;
  readonly posting_date: Date;
  readonly status: string;
}
