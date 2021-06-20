import { Component, Input, Output, EventEmitter, CUSTOM_ELEMENTS_SCHEMA, NgModule, OnInit } from '@angular/core';
import { ExtendedFormGroup } from 'dist/dynamic-form/lib/model/custom-classes/extended-form-group';
import { DynamicFormSection, FollowUpItem, RuleType, FormService } from 'dynamic-form';

@Component({
  selector: 'storybook-button',
  template: `<app-dynamic-form
  [extendedFormGroup]="extendedFormGroup"
  [activeStep]="0"
></app-dynamic-form>`
})
export class DemoComponent implements OnInit {

  extendedFormGroup: ExtendedFormGroup;

  constructor(private formService: FormService) {}
  ngOnInit(): void {
    this.extendedFormGroup = this.data();
  }
  /**
   * Is this the principal call to action on the page?
   */
  @Input()
  primary = false;

  /**
   * What background color to use
   */
  @Input()
  backgroundColor?: string;

  /**
   * How large should the button be?
   */
  @Input()
  size: 'small' | 'medium' | 'large' = 'medium';

  /**
   * Button contents
   *
   * @required
   */
  @Input()
  label = 'Button';

  /**
   * Optional click handler
   */
  @Output()
  onClick = new EventEmitter<Event>();

  public get classes(): string[] {
    const mode = this.primary ? 'storybook-button--primary' : 'storybook-button--secondary';

    return ['storybook-button', `storybook-button--${this.size}`, mode];
  }

  data(): ExtendedFormGroup {
    const familyFollowup: FollowUpItem = {
      type: "inline",
      items: [
          {
              key: "partner-birth-date",
              controlType: "Datepicker",
              value: "",
              controlMetaData: {
                  label: "Dina partners födelsedatum:",
              },
              rules: [
                  {
                      message: "field is required",
                      type: RuleType.required,
                  },
              ],
          },
          {
              key: "partner-name",
              controlType: "Text",
              value: "",
              controlMetaData: {
                  label: "Din partners för-och efternamn:",
              },
              rules: [
                  {
                      message: "field is required",
                      type: RuleType.required,
                  },
              ],
          },
          {
              key: "partner-monthly-income",
              controlType: "Number",
              value: "",
              controlMetaData: {
                  label: "Din partners månadsinkomst:",
              },
              rules: [
                  {
                      message: "field is required",
                      type: RuleType.required,
                  },
              ],
          },
          {
              key: "partner-monthly-income-more-than-equal",
              controlType: "Number",
              value: "",
              controlMetaData: {
                  label: "partner-monthly-income-more-than-equal",
              },
              rules: [
                  {
                      message: "field is required",
                      type: RuleType.required,
                  },
                  {
                      message: "more than or equal partner monthly income",
                      type: RuleType.minThanEqualsReference,
                      value: "partner-monthly-income",
                  },
              ],
          },
          {
              key: "partner-monthly-income-more-than",
              controlType: "Number",
              value: "",
              controlMetaData: {
                  label: "partner-monthly-income-more-than",
              },
              rules: [
                  {
                      message: "field is required",
                      type: RuleType.required,
                  },
                  {
                      message: "more than partner monthly income",
                      type: RuleType.minThanReference,
                      value: "partner-monthly-income",
                  },
              ],
          },
          {
              key: "partner-monthly-income-less-than",
              controlType: "Number",
              value: "",
              controlMetaData: {
                  label: "partner-monthly-income-less-than",
              },
              rules: [
                  {
                      message: "field is required",
                      type: RuleType.required,
                  },
                  {
                      message: "less than partner monthly income",
                      type: RuleType.maxThanReference,
                      value: "partner-monthly-income",
                  },
              ],
          },
          {
              key: "partner-monthly-income-less-than-equal",
              controlType: "Number",
              value: "",
              controlMetaData: {
                  label: "partner-monthly-income-less-than-equal",
              },
              rules: [
                  {
                      message: "field is required",
                      type: RuleType.required,
                  },
                  {
                      message: "less than equal partner monthly income",
                      type: RuleType.maxThanEqualReference,
                      value: "partner-monthly-income",
                  },
              ],
          },
          {
              key: "partner-monthly-income-radio",
              controlType: "Radio",
              label: "",
              options: [
                  {
                      id: "1",
                      value: "1",
                      label: "Före skatt",
                  },
                  {
                      id: "2",
                      value: "2",
                      label: "Efter skatt",
                  },
              ],
          },
          {
              key: "then-maried",
              controlType: "Text",
              label: "Gift sedan",
          },
      ],
    };

    const formGroup: DynamicFormSection[] = [
        {
            key: "form1",
            title: "Familj",
            items: [
                {
                    key: "relation",
                    title: "Relation",
                    controlType: "ToggleSelector",
                    options: [
                        {
                            id: "1",
                            value: "1",
                            label: "Gift",
                            followUpItems: familyFollowup,
                        },
                        {
                            id: "2",
                            value: "2",
                            label: "Sambo",
                            followUpItems: familyFollowup,
                        },
                        {
                            id: "3",
                            value: "3",
                            label: "Sarbo",
                            followUpItems: familyFollowup,
                        },
                        {
                            id: "4",
                            value: "4",
                            label: "Singel",
                        },
                    ],
                    rules: [
                        {
                            type: RuleType.required,
                            message: "please select one item",
                            value: "",
                        },
                    ],
                },
                {
                    key: "extra-information",
                    controlType: "Checkbox",
                    title: "Har du och din partner något av nedstående?",
                    label: "Äktenskapsförord",
                    value: "",
                },
                {
                    key: "deed-of-gift",
                    controlType: "Checkbox",
                    label: "Gåvobrev",
                    value: "",
                },
                {
                    key: "testament",
                    controlType: "Checkbox",
                    label: "Testamente",
                    value: "",
                },
                {
                    key: "none-of-the-above",
                    controlType: "Checkbox",
                    label: "Inget av ovanstående",
                    value: "",
                },
                {
                    key: "barn",
                    controlType: "Radio",
                    title: "Barn",
                    description: "Har du eller din partner barn?",
                    value: "",
                    options: [
                        {
                            id: "1",
                            value: "1",
                            label: "Ja",
                            followUpItems: {
                                type: "modal",
                                items: [
                                    {
                                        key: "child-name",
                                        controlType: "Text",
                                        value: "",
                                        controlMetaData: {
                                            label: "Barnets namn",
                                        },
                                        rules: [
                                            {
                                                message: "field is required",
                                                type: RuleType.required,
                                            },
                                        ],
                                    },
                                    {
                                        key: "child-to",
                                        controlType: "Text",
                                        value: "",
                                        controlMetaData: {
                                            label: "Barn till",
                                        },
                                        rules: [
                                            {
                                                message: "field is required",
                                                type: RuleType.required,
                                            },
                                        ],
                                    },
                                    {
                                        key: "accomodation",
                                        controlType: "Text",
                                        value: "",
                                        controlMetaData: {
                                            label: "Boende",
                                        },
                                        rules: [
                                            {
                                                message: "field is required",
                                                type: RuleType.required,
                                            },
                                        ],
                                    },
                                    {
                                        key: "child-birthday",
                                        controlType: "Datepicker",
                                        value: "",
                                        controlMetaData: {
                                            label: "Barnets födelsedag:",
                                        },
                                        rules: [
                                            {
                                                message: "field is required",
                                                type: RuleType.required,
                                            },
                                        ],
                                    },
                                    {
                                        key: "is-child-with-partner",
                                        controlType: "Radio",
                                        value: "",
                                        controlMetaData: {
                                            label: "Är barnet gemensamt med din partner",
                                        },
                                        rules: [
                                            {
                                                message: "field is required",
                                                type: RuleType.required,
                                            },
                                        ],
                                        options: [
                                            {
                                                id: "1",
                                                value: "1",
                                                label: "Ja",
                                            },
                                            {
                                                id: "2",
                                                value: "2",
                                                label: "Nej",
                                            },
                                        ],
                                    },
                                    {
                                        key: "whos-child",
                                        controlType: "Radio",
                                        value: "",
                                        rules: [
                                            {
                                                message: "field is required",
                                                type: RuleType.required,
                                            },
                                        ],
                                        options: [
                                            {
                                                id: "1",
                                                value: "1",
                                                label: "Barnet är mitt barn",
                                            },
                                            {
                                                id: "2",
                                                value: "2",
                                                label: "Barnet är min partners barn",
                                            },
                                        ],
                                    },
                                ],
                                multi: true,
                            },
                        },
                        {
                            id: "2",
                            value: "2",
                            label: "Nej",
                        },
                    ],
                    rules: [
                        {
                            type: RuleType.required,
                            message: "value is required",
                            value: "",
                        },
                    ],
                },
            ]
        }
    ];

    const x = this.formService.dynamicFormSectionsToFormGroup(formGroup)
    console.log(x);
    return x;
  }
}