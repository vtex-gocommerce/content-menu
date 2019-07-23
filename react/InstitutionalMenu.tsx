import * as React from 'react'
import { Query } from 'react-apollo'
import { defineMessages } from 'react-intl'

import { Link } from 'vtex.render-runtime'
// @ts-ignore
import { Menu } from 'vtex.menu'

import ROUTES_QUERY from './graphql/routes.graphql'

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

const InstitutionalMenu = (props: any) => (
  <Query query={ROUTES_QUERY} variables={{ domain: 'store' }}>
    {({ data, loading, error }: any) => {
      if (error || loading) {
        // TODO add loader and error message
        return null
      }

      const pagesRoutes = (data.routes || [])
        .filter((route: Route) => (route.context || '').endsWith('ContentPageContext'))


      return (
        <Menu { ...props }>
          {pagesRoutes.map((route: Route) => (
            <div className=" mh6 pv2">
              <Link
                className={'no-underline pointer t-body c-on-base pointer'}
                key={route.routeId}
                to={route.path}
              >
                {route.title}
              </Link>
            </div>
          ))}
        </Menu>
      )
    }}
  </Query>
)

InstitutionalMenu.getSchema = () => ({
  title: messages.menuTitle.id,
})

export default InstitutionalMenu
