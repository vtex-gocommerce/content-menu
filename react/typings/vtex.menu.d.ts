declare module 'vtex.menu' {
  import { ReactType } from 'react'
  
  enum Typography {
    heading1 = 't-heading-1',
    heading2 = 't-heading-2',
    heading3 = 't-heading-3',
    heading4 = 't-heading-4',
    heading5 = 't-heading-5',
    body = 't-body',
    small = 't-small',
    mini = 't-mini',
  }

  interface MenuItemSchema {
    id: string
    type: 'category' | 'custom'
    iconProps: IconProps
    iconPosition: 'left' | 'right'
    highlight: boolean
    itemProps: CategoryItemSchema | CustomItemSchema
    blockClass?: string
  }

  export interface MenuSchema {
    orientation?: 'vertical' | 'horizontal'
    categoryId?: number
    textType?: Typography
    title?: MenuItemSchema,
    additionalDef?: string,
    blockClass?: string
  }

  export const Menu: ReactType
  export const MenuItem: ReactType
}