import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { Meta } from "@angular/platform-browser";
import { TextboxModule } from "@sebgroup/ng-components";
import { moduleMetadata, Story } from "@storybook/angular";
import { DynamicFormModule } from "projects/dynamic-form-new/src/public-api";
import { DemoComponent } from "./demo.component";

export default {
  title: 'Example/DynamicForm',
  component: DemoComponent,
  decorators: [
    moduleMetadata({
      declarations: [DemoComponent],
      imports: [
        DynamicFormModule,
        ReactiveFormsModule,
        // DigitOnlyModule,
        // TextboxModule,
      ],
      providers: [

      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }),
  ],
  parameters: {
    docs: {
      page: null,
    },
  },
};

const Template: Story<DemoComponent> = (args: DemoComponent) => ({
  props: args,
});

export const Basic = Template.bind({});
Basic.args = {
  activeStep: 0,
  fields: [
    {
      title: 'Basic Usage',
      category: 'Basic cat',
      name: 'section-1-login',
      controlType: 'Section',
      fields: [
        {
          name: 'name',
          label: 'Name',
          order: 1,
          controlType: 'Text',
        },
        {
          label: 'Birthday',
          name: 'p-birthday',
          controlType: 'Datepicker',
        },
      ]
    },
    {
      name: 'name',
      label: 'Name',
      order: 1,
      controlType: 'TextArea',
      // rules: [
      //   {
      //     message: 'field is required',
      //     type: RuleType.required,
      //   },
      //   {
      //     message: 'should be more than base',
      //     type: RuleType.minThanReference,
      //     value: 'partner-monthly-income',
      //   },
      // ],
    },
    {
      name: 'email',
      label: 'Email',
      placeholder: 'name@domain.com',
      order: 2,
      controlType: 'Text',
    },
    {
      label: 'Birthday',
      name: 'child-birthday',
      controlType: 'Datepicker',
    },
    {
      name: 'user-choice',
      label: 'I understand',
      condensed: true,
      inline: true,
      order: 3,
      value: "yes",
      list: [{ label: "yes", value: "yes" }, { label: "no", value: "no"}],
      controlType: 'Radio',
    },
    {
      name: 'user-selector-toggle',
      label: 'I understand?',
      order: 3,
      value: "yes",
      list: [{ label: "yes", value: "yes" }, { label: "no", value: "no"}],
      controlType: 'ToggleSelector',
    },
    {
      name: 'user-accepted',
      label: 'I understand',
      order: 3,
      value: true,
      controlType: 'Checkbox',
    },
  ],
};