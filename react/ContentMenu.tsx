import * as React from 'react'
import { Query } from 'react-apollo'
import { defineMessages } from 'react-intl'

import ROUTES_QUERY from './graphql/routes.graphql'
import { Menu, MenuItem } from 'vtex.menu'

interface Route {
  context: string | null
  path: string
  title: string
  routeId: string
}

interface MenuSchema {
  visible: boolean
  label: string | null
}

const messages = defineMessages({
  menuTitle: {
    defaultMessage: '',
    id: 'admin/editor.content-menu.title',
  },
})

const ContentMenu: StorefrontFunctionComponent<MenuSchema> = ({ visible, label }) => {
  if (!visible) { return null }

  return (
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
            {...(label && {
              title: {
                id: '',
                type: 'custom',
                highlight: false,
                itemProps: {
                  text: label,
                  type: 'internal',
                  noFollow: true,
                  tagTitle: label,
                  href: '',
                }
              }
            })}
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
}

ContentMenu.getSchema = () => ({
  title: messages.menuTitle.id,
})

export default ContentMenu
