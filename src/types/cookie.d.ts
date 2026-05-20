declare module 'cookie' {
  export interface CookieSerializeOptions {
    domain?: string;
    encode?: (value: string) => string;
    expires?: Date;
    httpOnly?: boolean;
    maxAge?: number;
    path?: string;
    priority?: 'low' | 'medium' | 'high';
    sameSite?: boolean | 'lax' | 'strict' | 'none';
    secure?: boolean;
  }

  export function parse(str: string, options?: any): { [key: string]: string };
  export function serialize(
    name: string,
    val: string | null | undefined,
    options?: CookieSerializeOptions
  ): string;
}
