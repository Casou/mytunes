export default class ObjectUtil {
  
  static clone(object) {
      return Object.assign( Object.create( Object.getPrototypeOf(object)), object);
  }
}