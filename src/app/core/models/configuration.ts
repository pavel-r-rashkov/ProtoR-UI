import { Rule } from './rule';

export interface Configuration {
  id: number;
  transitive: boolean;
  backwardCompatible: boolean;
  forwardCompatible: boolean;
  inherit: boolean;
  ruleConfigurations: Rule[];
}
