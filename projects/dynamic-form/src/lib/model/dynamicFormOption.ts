import { AttributeTypeMap } from './models';
import { DynamicFormItem, Media } from './dynamicFormItem';
import { DynamicFormSectionO } from './dynamicFormSection';

export interface ConfirmInformation {
  title?: string;
  message?: string;
  accept?: string;
  deny?: string;
}

export interface FollowUpItem {
  type: string;
  title?: string;
  subTitle?: string;
  description?: string;
  items: DynamicFormItem[] | DynamicFormSectionO[];
  multi?: boolean;
}

export interface DynamicFormOption<T = any> {
  id?: string;
  value?: T;
  label?: string | null;
  disabled?: boolean | null;
  category?: string;
  order?: number;
  confirm?: ConfirmInformation;
  media?: Media[];
  followUpItems?: FollowUpItem;
}

export const attributeTypeMapDynamicFormOption: AttributeTypeMap[] = [
  { name: 'value', type: 'object' },
  { name: 'label', type: 'string' },
  { name: 'disabled', type: 'boolean' },
];
