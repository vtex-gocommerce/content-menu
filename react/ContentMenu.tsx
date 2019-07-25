import * as React from 'react'
import { Query } from 'react-apollo'
import { defineMessages } from 'react-intl'

import ROUTES_QUERY from './graphql/routes.graphql'
import { Menu, MenuItem, MenuSchema } from 'vtex.menu'

interface Route {
  context: string | null
  path: string
  title: string
  routeId: string
}

const messages = defineMessages({
  menuTitle: {
    defaultMessage: '',
    id: 'admin/editor.content-menu.title',
  },
})

const ContentMenu: StorefrontFunctionComponent<MenuSchema> = props => (
  <Query query={ROUTES_QUERY} variables={{ domain: 'store' }}>
    {({ data, loading, error }: any) => {
      if (error || loading) {
        // TODO add loader and error message
        return null
      }

      const pagesRoutes = (data.routes || [])
        .filter((route: Route) => (route.context || '').endsWith('ContentPageContext'))

      return (
        <Menu
          {...props}
          orientation={'vertical'}
        >
          {pagesRoutes.map(({ title, path, routeId }: Route) => (
            <MenuItem
              id={routeId}
              type={'custom'}
              highlight={false}
              itemProps={{
                type: 'internal',
                text: title,
                noFollow: false,
                tagTitle: title,
                href: path,
              }}
            />
          ))}
        </Menu>
      )
    }}
  </Query>
)

ContentMenu.getSchema = () => ({
  title: messages.menuTitle.id,
})

export default ContentMenu
