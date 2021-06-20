// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { moduleMetadata } from '@storybook/angular';
import { Story, Meta } from '@storybook/angular/types-6-0';
import { DynamicFormComponent, DynamicFormModule, FormService } from 'dynamic-form';
import { DemoComponent } from './button.component';

export default {
  title: 'Example/DynamicForm',
  component: DemoComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, DynamicFormModule, FormsModule, ReactiveFormsModule],
      providers: [FormService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }),
  ]
} as Meta;

const Template: Story<DynamicFormComponent> = (args: DynamicFormComponent) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  label: 'Button',
};

export const Secondary = Template.bind({});
Secondary.args = {
  label: 'Button',
};

export const Large = Template.bind({});
Large.args = {
  size: 'large',
  label: 'Button',
};

export const Small = Template.bind({});
Small.args = {
  size: 'small',
  label: 'Button',
};
