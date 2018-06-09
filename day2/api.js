window.API = {
  fetchFriends() {
    return new Promise((res, rej) => {
      const friends = [
        {
          name: 'Jordyn',
          active: true
        },
        {
          name: 'Mikenzi',
          active: true
        },
        {
          name: 'Tiffany',
          active: true
        },
        {
          name: 'Jake',
          active: false
        }
      ]

      setTimeout(() => res(friends), 2000);
    })
  }
}