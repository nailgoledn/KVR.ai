export interface ProjectPlugin {
    match(input: string): boolean;
    generate(): any;
  }