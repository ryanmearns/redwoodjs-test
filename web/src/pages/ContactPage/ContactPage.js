import {
  Form,
  TextField,
  TextAreaField,
  Submit,
  FieldError,
  Label,
  FormError,
  useForm,
} from '@redwoodjs/forms'
import { toast, Toaster } from '@redwoodjs/web/toast'
import { MetaTags, useMutation } from '@redwoodjs/web'

const CREATE_CONTACT = gql`
  mutation CreateContactMutation($input: CreateContactInput!) {
    createContact(input: $input) {
      id
    }
  }
`

const ContactPage = () => {
  const formMethods = useForm()

  const [create, { loading, error }] = useMutation(CREATE_CONTACT, {
    onCompleted: () => {
      toast.success('Thank you for your submission!')
      formMethods.reset()
    },
  })

  const onSubmit = (data) => {
    create({ variables: { input: data } })
  }

  return (
    <>
      <MetaTags title="Contact" description="Contact page" />
      <Toaster />
      <Form
        onSubmit={onSubmit}
        config={{ mode: 'onBlur' }}
        formMethods={formMethods}
      >
        <FormError error={error} />
        <Label name="name">Name</Label>
        <TextField name="name" validation={{ required: true }} />
        <FieldError name="name" />
        <br />
        <Label name="email">Email</Label>
        <TextField
          name="email"
          validation={{
            required: true,
            pattern: {
              value: /^[^@]+@[^.]+\..+$/,
              message: 'Please enter a valid email address',
            },
          }}
        />
        <FieldError name="email" />
        <br />
        <Label name="message">Message</Label>
        <TextAreaField name="message" validation={{ required: true }} />
        <FieldError name="message" />
        <br />
        <button>
          <Submit disabled={loading}>Send Message</Submit>
        </button>
      </Form>
    </>
  )
}

export default ContactPage
