class Variable {
  constructor(
    public name: string,
    public value: string,
    public type: string,
    public scope: string
  ) {}

  toJson(): string {
    return JSON.stringify({
      name: this.name,
      value: this.value,
      type: this.type,
      scope: this.scope,
    });
  }
}


export default Variable;