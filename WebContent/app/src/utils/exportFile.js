import doFetch from "./doFetch";

// eslint-disable-next-line import/no-anonymous-default-export
export default function(type) {
  doFetch(type === 'participant' ? '/participant/export' : '/organization/export', {type: 'blob'}).then(blob => {
    const url = window.URL.createObjectURL(blob)
    const fileLink = document.createElement('a')

    fileLink.href = url;
    fileLink.download = `${type}.xls`
    document.body.appendChild(fileLink)
    fileLink.click()
    fileLink.remove()
  })
}
