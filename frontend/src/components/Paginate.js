import React from 'react'
import { Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useParams, useLocation } from 'react-router-dom'

function Paginate({ pages, page, keyword = '', isAdmin = false }) {
    if(keyword)
    {
        keyword = keyword.split('=')[1].split('&')[0];
    }
    console.log("Keyword: ",keyword)
  return (
    pages > 1 && (
      <Pagination>
        {[...Array(pages).keys()].map((x) => (
            <LinkContainer
            key={x + 1}
            to={
              !isAdmin
                ? {
                    pathname: '/',
                    search: `?keyword=${keyword}&page=${x + 1}`,
                  }
                : {
                    pathname: `/admin/productlist`,
                    search: `?keyword=${keyword}&page=${x + 1}`,
                  }
            }
            >
            <Pagination.Item 
              active={x + 1 === page}>
                {x + 1}
            </Pagination.Item>
            </LinkContainer>
        ))}
      </Pagination>
    )
  )
}

export default Paginate
