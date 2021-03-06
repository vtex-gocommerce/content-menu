import { FunctionComponent } from 'react'

declare global {
  interface StorefrontFunctionComponent<P = {}> extends FunctionComponent<P> {
    getSchema(props?: P): object
  }

  interface StorefrontComponent<P = {}, S = {}> extends Component<P, S> {
    schema?: object
    getSchema?(props: P): object
  }
}