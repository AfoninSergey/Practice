export const getLastPageFromLinks = (links) => links &&  +links?.match(/_page=(\d{1,3})&_limit=(\d{1,3})>; rel="last"/)[1]
