(function () {
  const listEl = $('#list')
  const titleEl = $('#title')
  const backBtnEl = $('#back-btn')

  let currentId = null

  function createItem (node) {
    let item = null

    if (node.type === 'bookmark') {
      item = $('<a></a>')
        .attr('href', node.url)
    } else {
      item = $('<a></a>')
        .attr('href', '#')
        .addClass('folder')
        .on('click', function (event) {
          event.preventDefault()
          updateMenu(node.id)
        })
    }

    return item
      .text(node.title)
      .addClass('list-group-item')
      .addClass('list-group-item-action')
  }

  function addItem (item) {
    if (item.type === 'bookmark' || item.type === 'folder') {
      listEl.append(createItem(item))
    }
  }

  function updateTitle (title) {
    titleEl.text(title)
  }

  function updateMenu(id) {
    browser.bookmarks.getSubTree(id)
      .then(r => r[0])
      .then(tree => {
        updateTitle(tree.title)
        listEl.empty()
        tree.children.forEach(child => addItem(child))
        currentId = id
      })
      .catch(err => {
        console.error('Can\'t access the bookmarks')
        console.error(err)
      })
  }

  backBtnEl.on('click', function () {
    if (currentId !== 'toolbar_____') {
      updateMenu('toolbar_____')
    }
  })

  updateMenu('toolbar_____')
})()
