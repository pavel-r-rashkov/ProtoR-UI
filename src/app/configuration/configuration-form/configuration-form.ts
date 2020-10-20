import { RuleForm } from '../rule-form/rule-form';

export interface ConfigurationForm {
  transitive: boolean;
  backwardCompatible: boolean;
  forwardCompatible: boolean;
  inherit: boolean;
  ruleConfigurations: RuleForm[];
}
