import { Form } from 'react-bootstrap';

function Checkbox({
  id, label, checked, onChange,
}) {
  return (
    <Form.Check
      type="checkbox"
      name="categories"
      id={id}
      label={label}
      onChange={() => onChange(id)}
      checked={checked}
    />

  );
}

export default Checkbox;
