// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { moduleMetadata } from '@storybook/angular';
import { Story, Meta } from '@storybook/angular/types-6-0';
import {
  DynamicFormModule,
  FormService,
  RuleType,
  FollowUpItem,
  DynamicFormSection,
} from 'dynamic-form';
import { DemoComponent } from './demo.component';

export default {
  title: 'Example/DynamicForm',
  component: DemoComponent,
  decorators: [
    moduleMetadata({
      declarations: [DemoComponent],
      imports: [DynamicFormModule],
      providers: [FormService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }),
  ],
} as Meta;

// export const actionsData = {
//   goToNextStep: action('goToNextStep'),
//   goToPreviousStep: action('goToPreviousStep'),
// };

// const Template: Story<DemoComponent> = (args: DemoComponent) => ({
//   props: {
//     ...args,
//     goToNextStep: actionsData.goToNextStep,
//     goToPreviousStep: actionsData.goToPreviousStep,
//   },
// });

const Template: Story<DemoComponent> = (args: DemoComponent) => ({
  props: args,
});

const familyFollowup: FollowUpItem = {
  type: 'inline',
  items: [
    {
      key: 'partner-birth-date',
      controlType: 'Datepicker',
      value: '',
      controlMetaData: {
        label: 'Dina partners födelsedatum:',
      },
      rules: [
        {
          message: 'field is required',
          type: RuleType.required,
        },
      ],
    },
    {
      key: 'partner-name',
      controlType: 'Text',
      value: '',
      controlMetaData: {
        label: 'Din partners för-och efternamn:',
      },
      rules: [
        {
          message: 'field is required',
          type: RuleType.required,
        },
      ],
    },
    {
      key: 'partner-monthly-income',
      controlType: 'Number',
      value: '',
      controlMetaData: {
        label: 'Din partners månadsinkomst:',
      },
      rules: [
        {
          message: 'field is required',
          type: RuleType.required,
        },
      ],
    },
    {
      key: 'partner-monthly-income-more-than-equal',
      controlType: 'Number',
      value: '',
      controlMetaData: {
        label: 'partner-monthly-income-more-than-equal',
      },
      rules: [
        {
          message: 'field is required',
          type: RuleType.required,
        },
        {
          message: 'more than or equal partner monthly income',
          type: RuleType.minThanEqualsReference,
          value: 'partner-monthly-income',
        },
      ],
    },
    {
      key: 'partner-monthly-income-more-than',
      controlType: 'Number',
      value: '',
      controlMetaData: {
        label: 'partner-monthly-income-more-than',
      },
      rules: [
        {
          message: 'field is required',
          type: RuleType.required,
        },
        {
          message: 'more than partner monthly income',
          type: RuleType.minThanReference,
          value: 'partner-monthly-income',
        },
      ],
    },
    {
      key: 'partner-monthly-income-less-than',
      controlType: 'Number',
      value: '',
      controlMetaData: {
        label: 'partner-monthly-income-less-than',
      },
      rules: [
        {
          message: 'field is required',
          type: RuleType.required,
        },
        {
          message: 'less than partner monthly income',
          type: RuleType.maxThanReference,
          value: 'partner-monthly-income',
        },
      ],
    },
    {
      key: 'partner-monthly-income-less-than-equal',
      controlType: 'Number',
      value: '',
      controlMetaData: {
        label: 'partner-monthly-income-less-than-equal',
      },
      rules: [
        {
          message: 'field is required',
          type: RuleType.required,
        },
        {
          message: 'less than equal partner monthly income',
          type: RuleType.maxThanEqualReference,
          value: 'partner-monthly-income',
        },
      ],
    },
    {
      key: 'partner-monthly-income-radio',
      controlType: 'Radio',
      label: '',
      options: [
        {
          id: '1',
          value: '1',
          label: 'Före skatt',
        },
        {
          id: '2',
          value: '2',
          label: 'Efter skatt',
        },
      ],
    },
    {
      key: 'then-maried',
      controlType: 'Text',
      label: 'Gift sedan',
    },
  ],
};

const formGroup: DynamicFormSection[] = [
  {
    key: 'form1',
    title: 'Familj',
    items: [
      {
        key: 'relation',
        title: 'Relation',
        controlType: 'ToggleSelector',
        options: [
          {
            id: '1',
            value: '1',
            label: 'Gift',
            followUpItems: familyFollowup,
          },
          {
            id: '2',
            value: '2',
            label: 'Sambo',
            followUpItems: familyFollowup,
          },
          {
            id: '3',
            value: '3',
            label: 'Sarbo',
            followUpItems: familyFollowup,
          },
          {
            id: '4',
            value: '4',
            label: 'Singel',
          },
        ],
        rules: [
          {
            type: RuleType.required,
            message: 'please select one item',
            value: '',
          },
        ],
      },
      {
        key: 'extra-information',
        controlType: 'Checkbox',
        title: 'Har du och din partner något av nedstående?',
        label: 'Äktenskapsförord',
        value: '',
      },
      {
        key: 'deed-of-gift',
        controlType: 'Checkbox',
        label: 'Gåvobrev',
        value: '',
      },
      {
        key: 'testament',
        controlType: 'Checkbox',
        label: 'Testamente',
        value: '',
      },
      {
        key: 'none-of-the-above',
        controlType: 'Checkbox',
        label: 'Inget av ovanstående',
        value: '',
      },
      {
        key: 'barn',
        controlType: 'Radio',
        title: 'Barn',
        description: 'Har du eller din partner barn?',
        value: '',
        options: [
          {
            id: '1',
            value: '1',
            label: 'Ja',
            followUpItems: {
              type: 'modal',
              items: [
                {
                  key: 'child-name',
                  controlType: 'Text',
                  value: '',
                  controlMetaData: {
                    label: 'Barnets namn',
                  },
                  rules: [
                    {
                      message: 'field is required',
                      type: RuleType.required,
                    },
                  ],
                },
                {
                  key: 'child-to',
                  controlType: 'Text',
                  value: '',
                  controlMetaData: {
                    label: 'Barn till',
                  },
                  rules: [
                    {
                      message: 'field is required',
                      type: RuleType.required,
                    },
                  ],
                },
                {
                  key: 'accomodation',
                  controlType: 'Text',
                  value: '',
                  controlMetaData: {
                    label: 'Boende',
                  },
                  rules: [
                    {
                      message: 'field is required',
                      type: RuleType.required,
                    },
                  ],
                },
                {
                  key: 'child-birthday',
                  controlType: 'Datepicker',
                  value: '',
                  controlMetaData: {
                    label: 'Barnets födelsedag:',
                  },
                  rules: [
                    {
                      message: 'field is required',
                      type: RuleType.required,
                    },
                  ],
                },
                {
                  key: 'is-child-with-partner',
                  controlType: 'Radio',
                  value: '',
                  controlMetaData: {
                    label: 'Är barnet gemensamt med din partner',
                  },
                  rules: [
                    {
                      message: 'field is required',
                      type: RuleType.required,
                    },
                  ],
                  options: [
                    {
                      id: '1',
                      value: '1',
                      label: 'Ja',
                    },
                    {
                      id: '2',
                      value: '2',
                      label: 'Nej',
                    },
                  ],
                },
                {
                  key: 'whos-child',
                  controlType: 'Radio',
                  value: '',
                  rules: [
                    {
                      message: 'field is required',
                      type: RuleType.required,
                    },
                  ],
                  options: [
                    {
                      id: '1',
                      value: '1',
                      label: 'Barnet är mitt barn',
                    },
                    {
                      id: '2',
                      value: '2',
                      label: 'Barnet är min partners barn',
                    },
                  ],
                },
              ],
              multi: true,
            },
          },
          {
            id: '2',
            value: '2',
            label: 'Nej',
          },
        ],
        rules: [
          {
            type: RuleType.required,
            message: 'value is required',
            value: '',
          },
        ],
      },
    ],
    multi: true,
  },
  {
    key: 'form2',
    title: 'Sysselsättning',
    items: [
      {
        key: 'occupation',
        title: 'Välj din huvudsaklig sysselsättning',
        controlType: 'ToggleSelector',
        options: [
          {
            id: '1',
            value: '1',
            label: 'Anställd',
          },
          {
            id: '2',
            value: '2',
            label: 'Företagare',
          },
          {
            id: '3',
            value: '3',
            label: 'Pensionär',
          },
          {
            id: '4',
            value: '4',
            label: 'Student',
          },
          {
            id: '5',
            value: '5',
            label: 'Annat',
          },
        ],
      },
      {
        key: 'profession',
        controlType: 'Text',
        label: 'Ditt yrke',
        value: '',
        rules: [
          {
            message: 'field is required',
            type: RuleType.required,
          },
        ],
      },
      {
        key: 'kind-of-employment',
        controlType: 'Text',
        label: 'Vilken slags anställning/tjänsterpension',
        value: '',
        rules: [
          {
            message: 'field is required',
            type: RuleType.required,
          },
        ],
      },
      {
        key: 'worked-since',
        controlType: 'Text',
        label: 'Har arbetat sedan',
        value: '',
        rules: [
          {
            message: 'field is required',
            type: RuleType.required,
          },
        ],
      },
      {
        key: 'monthly-income',
        controlType: 'Text',
        value: '',
        controlMetaData: {
          label: 'Din månadsinkomst',
          inputGroupLabel: 'kr',
          inputGroupPosition: 'right',
        },
        rules: [
          {
            message: 'field is required',
            type: RuleType.required,
          },
        ],
      },
      {
        key: 'estimated-income-after-tax',
        controlType: 'Text',
        value: '',
        controlMetaData: {
          label: 'Beräknad inkonst efterskatt',
          inputGroupLabel: 'kr',
          inputGroupPosition: 'right',
        },
        rules: [
          {
            message: 'field is required',
            type: RuleType.required,
          },
        ],
      },
      {
        key: 'professional-experience',
        title: 'Yrekeserfarenhet av värdepapper eller försäkring',
        description:
          'Vi behöver veta om du har haft ett yrke där du lärt dig om värdepapper och finansiella marknader eftersom vi anpassar våra råd efter din kunskapsnivå och erfarenheta',
        controlType: 'Radio',
        value: '',
        options: [
          {
            id: '1',
            value: '1',
            label: 'Ja, det har jag',
          },
          {
            id: '2',
            value: '2',
            label: 'Nej, det har jag inte',
          },
        ],
      },
      {
        key: 'other-comments',
        controlType: 'TextArea',
        controlMetaData: {
          label: 'Beräknad inkonst efterskatt',
          inputGroupLabel: 'kr',
          inputGroupPosition: 'right',
        },
      },
    ],
  },
];

export const Basic = Template.bind({});
Basic.args = {
  activeStep: 0,
  formSection: [
    {
      title: 'Basic Usage',
      key: 'section-1-login',
      items: [
        {
          key: 'name',
          label: 'Name',
          order: 1,
          controlType: 'Text',
        },
        {
          key: 'email',
          label: 'Email',
          placeholder: 'name@domain.com',
          order: 2,
          controlType: 'Text',
        },
        {
          key: 'user-accepted',
          label: 'I understand',
          order: 3,
          value: true,
          controlType: 'Checkbox',
        },
      ],
    },
  ] as DynamicFormSection[],
};

export const ConditionalRendering = Template.bind({});
ConditionalRendering.args = {
  activeStep: 0,
  formSection: [
    {
      title: 'Conditinal Rendering',
      key: 'section-2-extra-info',
      items: [
        {
          key: 'have-additional-info',
          label: 'I have additional information',
          order: 1,
          value: false,
          controlType: 'Radio',
          options: [
            {
              id: '1',
              value: '1',
              label: 'Yes',
              followUpItems: {
                type: 'inline',
                items: [
                  {
                    key: 'info',
                    controlType: 'Text',
                    value: '',
                    controlMetaData: {
                      label: 'Additional information',
                    },
                  },
                ],
              },
            },
            {
              id: '2',
              value: '2',
              label: 'No',
            },
          ],
        },
      ],
    },
  ] as DynamicFormSection[],
};

export const FormValidation = Template.bind({});
FormValidation.args = {
  activeStep: 0,
  formSection: [
    {
      title: 'Form Validation',
      key: 'section-2-extra-info',
      items: [
        {
          key: 'required-input',
          controlType: 'Text',
          value: '',
          controlMetaData: {
            label: 'Required Input',
          },
          rules: [
            {
              message: 'field is required',
              type: RuleType.required,
            },
          ],
        },
        {
          key: 'partner-monthly-income',
          controlType: 'Number',
          value: '',
          controlMetaData: {
            label: 'Base Number',
          },
          rules: [
            {
              message: 'field is required',
              type: RuleType.required,
            },
          ],
        },
        {
          key: 'partner-monthly-income-more-than-equal',
          controlType: 'Number',
          value: '',
          controlMetaData: {
            label: 'more than equal base',
          },
          rules: [
            {
              message: 'field is required',
              type: RuleType.required,
            },
            {
              message: 'should be more than or equal base',
              type: RuleType.minThanEqualsReference,
              value: 'partner-monthly-income',
            },
          ],
        },
        {
          key: 'partner-monthly-income-more-than',
          controlType: 'Number',
          value: '',
          controlMetaData: {
            label: 'more than base',
          },
          rules: [
            {
              message: 'field is required',
              type: RuleType.required,
            },
            {
              message: 'should be more than base',
              type: RuleType.minThanReference,
              value: 'partner-monthly-income',
            },
          ],
        },
        {
          key: 'partner-monthly-income-less-than',
          controlType: 'Number',
          value: '',
          controlMetaData: {
            label: 'less than base',
          },
          rules: [
            {
              message: 'field is required',
              type: RuleType.required,
            },
            {
              message: 'should be less than base',
              type: RuleType.maxThanReference,
              value: 'partner-monthly-income',
            },
          ],
        },
        {
          key: 'partner-monthly-income-less-than-equal',
          controlType: 'Number',
          value: '',
          controlMetaData: {
            label: 'less than equal base',
          },
          rules: [
            {
              message: 'field is required',
              type: RuleType.required,
            },
            {
              message: 'should be less than equal base',
              type: RuleType.maxThanEqualReference,
              value: 'partner-monthly-income',
            },
          ],
        },
      ],
    },
  ] as DynamicFormSection[],
  hasFormActions: true,
  nextAction: { hasAction: true, label: 'Next' },
};

export const MultiStepForm = Template.bind({});
MultiStepForm.args = {
  activeStep: 0,
  formSection: [
    {
      title: 'Step 1',
      key: 'step-1',
      items: [
        {
          key: 'name',
          label: 'Step 1 Input',
          order: 1,
          controlType: 'Text',
        },
        {
          key: 'email',
          label: 'Another Step 1 Input',
          order: 2,
          controlType: 'Text',
        },
      ],
    },
    {
      title: 'step 2',
      key: 'step-2',
      items: [
        {
          key: 'name',
          label: 'Step 2 input',
          order: 1,
          controlType: 'Text',
        },
        {
          key: 'email',
          label: 'Another Step 2 input',
          placeholder: 'name@domain.com',
          order: 2,
          controlType: 'Text',
        },
        {
          key: 'user-accepted',
          label: 'I understand',
          order: 3,
          value: true,
          controlType: 'Checkbox',
        },
      ],
    },
  ] as DynamicFormSection[],
  hasFormActions: true,
  nextAction: { hasAction: true, label: 'Next' },
  previousAction: { hasAction: true, label: 'Previous' },
};
