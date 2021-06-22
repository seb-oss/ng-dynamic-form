import {
  DynamicFormSection,
  DynamicFormItem,
  DynamicFormOption,
  DynamicFormType,
  Rule,
  RuleType,
} from 'dynamic-form';

export enum QuestionOptionType {
  None,
  Card,
  Input,
  Radio,
  CheckBox,
  Group,
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




const mapToDynamicForm = (obj): DynamicFormSection[] => {
  let items: DynamicFormItem[] = [];

  switch (obj.optionType) {
      case QuestionOptionType.Card:
          const options: DynamicFormOption[] = obj.answerAlternatives.map(alternative => {
              return {
                  id: alternative.id,
                  label: alternative.text,
                  category: alternative.category,
                  value: alternative.id,
                  order: alternative.order,
              };
          });
          items = [
              {
                  key: obj.id,
                  descriptionHeader: obj.text,
                  description: obj.description,
                  controlType: DynamicFormType.Card,
                  media: obj.media,
                  options,
              },
          ];
          break;
      case QuestionOptionType.Input:
          items = obj.answerAlternatives.map(alternative => {
              return {
                  key: alternative.id,
                  descriptionHeader: alternative.text,
                  description: alternative.description,
                  controlType: mapControlType(alternative.type),
                  media: alternative.media,
                  rules: mapRules(alternative.rules),
                  controlMetaData: {
                      label: alternative.reasonLabel,
                      inputGroupLabel: "kr/mån",
                      inputGroupPosition: "right",
                  },
              };
          });
          break;
      case QuestionOptionType.Radio:
          items = obj.answerAlternatives.map(alternative => {
              return {
                  key: alternative.id,
                  descriptionHeader: alternative.text,
                  description: alternative.description,
                  controlType: mapControlType(alternative.type),
                  media: alternative.media,
                  rules: mapRules(alternative.rules),
                  controlMetaData: {
                      label: alternative.reasonLabel,
                      inputGroupLabel: "kr/mån",
                      inputGroupPosition: "right",
                  },
                  options: [
                      {
                          id: "1",
                          value: "1",
                          label: "Ja",
                          followUpItems: {
                              type: "modal",
                              items: mapToDynamicItem(alternative.followupQuestions[0]?.answerAlternatives),
                          },
                      },
                      {
                          id: "2",
                          value: "2",
                          label: "Nej",
                      },
                  ],
              };
          });
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
      default:
          items = obj.answerAlternatives.map(alternative => {
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
  return [
      {
          key: obj.id,
          category: obj.subTitle,
          title: obj.name,
          description: obj.description,
          sectionType: obj.optionType,
          text: obj.text,
          items: items,
      },
  ];
}

const mapToDynamicItem = (obj): DynamicFormItem[] => {
  return obj?.map(o => {
      return {
          key: o.id,
          descriptionHeader: o.text,
          description: o.description,
          controlType: mapControlType(o.type),
          media: o.media,
          rules: mapRules(o.rules),
          controlMetaData: {
              label: o.reasonLabel,
              inputGroupLabel: "kr/mån",
              inputGroupPosition: "right",
          },
      };
  });
}

const mapRules = (rules): Rule[] => {
  return rules.map(rule => {
      switch (rule.ruleType) {
          case 0:
          default:
              return { value: rule.value, message: rule.message, type: RuleType.required };
          case 1:
              return { value: rule.value, message: rule.message, type: RuleType.pattern };
          case 2:
              return { value: rule.value, message: rule.message, type: RuleType.min };
          case 3:
              return { value: rule.value, message: rule.message, type: RuleType.max };
          case 4:
              return { value: rule.value, message: rule.message, type: RuleType.minLength };
          case 5:
              return { value: rule.value, message: rule.message, type: RuleType.maxLength };
          case 6:
              return { value: rule.value, message: rule.message, type: RuleType.minThanReference };
          case 7:
              return { value: rule.value, message: rule.message, type: RuleType.minThanEqualsReference };
          case 8:
              return { value: rule.value, message: rule.message, type: RuleType.maxThanReference };
          case 9:
              return { value: rule.value, message: rule.message, type: RuleType.maxThanEqualReference };
          case 10:
              return { value: rule.value, message: rule.message, type: RuleType.confirm };
      }
  });
}

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
}
