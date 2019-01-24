// escribi esto hace tiempo, no quiero estar llamando a "indexOf", "splice", "push"
// para hacermelo mas amigable escribi esto

export default class Tags {

  constructor() {
    this.tags = new Array();
  }

  addTag = (tag) => {
    if (this.tags.indexOf(tag) === -1) {
      this.tags.push(tag)
    }
  }

  removeTag = tag => {
    const index = this.tags.indexOf(tag);
    this.tags.splice(index, 1)
  }

  getTag = () => {
    return this.tags;
  }

  existTag = tag => {
    if (this.tags.indexOf(tag) !== -1) {
      return true;
    }
    return false;
  }
}
