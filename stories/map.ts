import {
  DynamicFormSection,
  DynamicFormItem,
  DynamicFormOption,
  DynamicFormType,
  Rule,
  RuleType,
} from 'projects/dynamic-form/src/lib';

export enum QuestionOptionType {
  None,
  Card,
  Input,
  Radio,
  CheckBox,
  Group,
  Table,
}

export enum ComponentType {
  None,
  Card,
  Text,
  RadioTextBox,
  CheckBox,
  Number,
  Date,
}

export function mapToDynamicForm(arr): DynamicFormSection[] {
  const mappedArray: DynamicFormSection[] = [];
  let items: DynamicFormItem[] = [];
  let section: DynamicFormSection = {};
  arr.forEach((obj) => {
    switch (obj.optionType) {
      case QuestionOptionType.Card:
        // section = {
        //   className: 'card p-3',
        // };
        const options: DynamicFormOption[] = obj.answerAlternatives.map(
          (alternative) => {
            return {
              id: alternative.id,
              label: alternative.text,
              category: alternative.category,
              value: alternative.id,
              order: alternative.order,
              confirm: alternative.confirm,
            };
          }
        );
        items = [
          {
            key: obj.id,
            descriptionHeader: obj.text,
            description: obj.description,
            controlType: DynamicFormType.Card,
            media: obj.media,
            rules: [
              {
                value: null,
                message: 'option required',
                type: RuleType.required,
              },
            ],
            options,
          },
        ];

        break;
      case QuestionOptionType.Input:
        items = obj.answerAlternatives.map((alternative) => {
          return {
            key: alternative.id,
            descriptionHeader: obj.text,
            description: obj.description,
            controlType: mapControlType(alternative.type),
            media: alternative.media,
            rules: mapRules(alternative.rules),
            controlMetaData: {
              label: alternative.reasonLabel,
              description: alternative.text,
              inputGroupLabel: parseConfiguration(alternative.configuration)
                ?.GroupLabel,
              inputGroupPosition: 'right',
            },
          };
        });
        break;
      case QuestionOptionType.Radio:
        items = [
          {
            key: obj.id,
            descriptionHeader: obj.descritpion,
            description: obj.text,
            controlType: DynamicFormType.Radio,
            media: obj.media,
            rules: [
              {
                type: RuleType.required,
                message: 'some message error',
                value: '',
              },
            ],
            controlMetaData: {
              label: obj.text,
            },
            options: obj.answerAlternatives.map((alternative) => {
              return {
                id: alternative.id,
                value: alternative.id,
                label: alternative.text,
                followUpItems: {
                  type: 'modal',
                  title: parseConfiguration(alternative.configuration)?.Modal
                    ?.Title,
                  description: parseConfiguration(alternative.configuration)
                    ?.Modal?.Description,
                  items: mapToDynamicForm(alternative.followupQuestions),
                  ...(!!alternative.followupQuestions.find(
                    (followUpQuestion) =>
                      followUpQuestion.optionType === QuestionOptionType.Table
                  ) && { multi: true }),
                },
              };
            }),
          },
        ];
        section = { description: obj.text };
        break;
      case QuestionOptionType.None:
        items = [
          {
            key: obj.id,
            descriptionHeader: obj.text,
            description: obj.description,
            controlType: DynamicFormType.Disclaimer,
            media: obj.media,
          },
        ];
        break;
      case QuestionOptionType.Table:
        mapToDynamicForm(obj.groupQuestionItems).map(
          (sec: DynamicFormSection) => {
            const sections = [sec, ...(section.sections ?? [])];
            section = { sections, items: [...items, ...sec.items] };
          }
        );
        break;
      case QuestionOptionType.Group:
        mapToDynamicForm(obj.groupQuestionItems).map(
          (sec: DynamicFormSection) => {
            items = [...items, ...sec.items];
          }
        );
        break;
      default:
        items = obj.answerAlternatives.map((alternative) => {
          return {
            key: alternative.id,
            descriptionHeader: alternative.text,
            description: alternative.description,
            controlType: DynamicFormType.Text,
            media: alternative.media,
            rules: mapRules(alternative.rules),
            label: alternative.reasonLabel,
          };
        });
        break;
    }
    mappedArray.push({
      key: obj.id,
      category: obj.subTitle,
      title: obj.name,
      description: obj.description,
      sectionType: obj.optionType,
      text: obj.text,
      ...section,
      items: items,
    });
    section = {};
    items = [];
  });
  return mappedArray;
}

const parseConfiguration = (configuration: string): { [key: string]: any } => {
  let parsedConfig: { [key: string]: any } = {};
  if (configuration) {
    try {
      parsedConfig = JSON.parse(configuration);
    } catch (e) {}
  }
  return parsedConfig;
};

const mapRules = (rules): Rule[] => {
  return rules.map((rule) => {
    switch (rule.ruleType) {
      case 0:
      default:
        return {
          value: rule.value,
          message: rule.message,
          type: RuleType.required,
        };
      case 1:
        return {
          value: rule.value,
          message: rule.message,
          type: RuleType.pattern,
        };
      case 2:
        return { value: rule.value, message: rule.message, type: RuleType.min };
      case 3:
        return { value: rule.value, message: rule.message, type: RuleType.max };
      case 4:
        return {
          value: rule.value,
          message: rule.message,
          type: RuleType.minLength,
        };
      case 5:
        return {
          value: rule.value,
          message: rule.message,
          type: RuleType.maxLength,
        };
      case 6:
        return {
          value: rule.value,
          message: rule.message,
          type: RuleType.minThanReference,
        };
      case 7:
        return {
          value: rule.value,
          message: rule.message,
          type: RuleType.minThanEqualsReference,
        };
      case 8:
        return {
          value: rule.value,
          message: rule.message,
          type: RuleType.maxThanReference,
        };
      case 9:
        return {
          value: rule.value,
          message: rule.message,
          type: RuleType.maxThanEqualReference,
        };
      case 10:
        return {
          value: rule.value,
          message: rule.message,
          type: RuleType.confirm,
        };
    }
  });
};

const mapControlType = (controlType: ComponentType): DynamicFormType => {
  switch (controlType) {
    case ComponentType.Text:
      return DynamicFormType.Text;
    case ComponentType.Number:
      return DynamicFormType.Number;
    case ComponentType.CheckBox:
      return DynamicFormType.Checkbox;
    case ComponentType.Date:
      return DynamicFormType.Datepicker;
    case ComponentType.RadioTextBox:
      return DynamicFormType.Radio;
    case ComponentType.Card:
      return DynamicFormType.Card;
    case ComponentType.None:
      return DynamicFormType.None;
    default:
      return DynamicFormType.Text;
  }
};
