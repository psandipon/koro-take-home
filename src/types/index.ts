interface Post {
  id: number
  title: string
  body: string
  userId: number
}

interface User {
  id: number
  name: string
  email: string
}

interface FormPost extends Omit<Post, 'id'> {}
interface FormUser extends Omit<User, 'id'> {}

enum ButtonVariant {
  Primary = 'btn-primary',
  Secondary = 'btn-secondary',
  Danger = 'btn-danger'
}

type ButtonVariantType = (typeof ButtonVariant)[keyof typeof ButtonVariant]

enum ButtonSize {
  Sm = 'btn-small',
  Md = 'btn-medium',
  Lg = 'btn-large'
}

type ButtonSizeType = (typeof ButtonSize)[keyof typeof ButtonSize]

enum BaseInputKind {
  Input = 'input',
  Textarea = 'textarea'
}

enum BaseTableEvent {
  Delete = 'delete',
  Edit = 'edit'
}

export { ButtonVariant, ButtonSize, BaseInputKind, BaseTableEvent }
export type { Post, User, FormPost, FormUser, ButtonSizeType, ButtonVariantType }

/*
 * Note:
 * enums can also be written as const objects
 * Like this:
 *
 * const ButtonVariant = {
 *   primary: 'btn-primary',
 *   secondary: 'btn-secondary',
 *   danger: 'btn-danger'
 * } as const
 *
 */
