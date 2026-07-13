type OutputRef<T> = Readonly<{
  component: string;
  output: string;
  readonly __type?: T;
}>;

const output = <T>(component: string, name: string): OutputRef<T> => ({
  component,
  output: name,
});

const definition = {
  kind: "cloudflare.worker",
  name: "service-f",
  project: ".",
  inputs: {
    BACKEND_URL: output<string>("service-e", "url"),
  },
} as const;

console.log(JSON.stringify(definition));
export default definition;
