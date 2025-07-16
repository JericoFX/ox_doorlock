import { Button, NumberInput, Select, Stack, Modal } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useForm } from '@mantine/form';

interface Props {
  opened: boolean;
  onClose: () => void;
  difficulty: Array<string | { areaSize: number; speedMultiplier: number }>;
  setDifficulty: (fn: (state: Array<string | { areaSize: number; speedMultiplier: number }>) => Array<string | { areaSize: number; speedMultiplier: number }>) => void;
  title: string;
}

interface FormProps {
  select: string | null;
  areaSize: number | null;
  speedMultiplier: number | null;
}

const HackDifficultyModal: React.FC<Props> = ({ opened, onClose, difficulty, setDifficulty, title }) => {
  const [select, setSelect] = useState<string | null>(null);
  const [editIndex, setEditIndex] = useState<number>(0);

  const selectData = [
    { value: 'easy', label: 'Easy' },
    { value: 'medium', label: 'Medium' },
    { value: 'hard', label: 'Hard' },
    { value: 'custom', label: 'Custom' },
  ];

  const currentDifficulty = difficulty[editIndex];

  useEffect(() => {
    setSelect(typeof currentDifficulty === 'string' ? currentDifficulty : 'custom');
  }, [currentDifficulty, editIndex]);

  const form = useForm<FormProps>({
    initialValues: {
      select,
      areaSize: typeof currentDifficulty === 'string' ? null : currentDifficulty?.areaSize || null,
      speedMultiplier: typeof currentDifficulty === 'string' ? null : currentDifficulty?.speedMultiplier || null,
    },

    validate: {
      select: (value) => (value === null ? 'Difficulty is required' : null),
      areaSize: (value, values) => (value === null && values.select === 'custom' ? 'Area size is required' : null),
      speedMultiplier: (value, values) =>
        value === null && values.select === 'custom' ? 'Speed multiplier is required' : null,
    },
  });

  useEffect(() => form.setFieldValue('select', select), [select]);

  const handleSubmit = (values: FormProps) => {
    const data =
      values.select === 'custom'
        ? { areaSize: values.areaSize!, speedMultiplier: values.speedMultiplier! }
        : values.select!;

    setDifficulty((prevState) => {
      const array = [...prevState];
      array[editIndex] = data;
      return array;
    });
    onClose();
  };

  const addDifficulty = () => {
    setDifficulty((prevState) => [...prevState, 'easy']);
  };

  const removeDifficulty = (index: number) => {
    setDifficulty((prevState) => prevState.filter((_, i) => i !== index));
  };

  return (
    <Modal opened={opened} onClose={onClose} title={title} centered size="md">
      <Stack>
        <div>
          <strong>Current Difficulties:</strong>
          {difficulty.map((diff, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
              <span>
                {index + 1}. {typeof diff === 'string' ? diff : `Custom (${diff.areaSize}°, ${diff.speedMultiplier}x)`}
              </span>
              <Button
                size="xs"
                variant="light"
                onClick={() => setEditIndex(index)}
                disabled={editIndex === index}
              >
                Edit
              </Button>
              <Button
                size="xs"
                variant="light"
                color="red"
                onClick={() => removeDifficulty(index)}
                disabled={difficulty.length === 1}
              >
                Remove
              </Button>
            </div>
          ))}
          <Button size="xs" variant="light" onClick={addDifficulty} style={{ marginTop: '8px' }}>
            Add Difficulty
          </Button>
        </div>

        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
          <Stack>
            <div>
              <strong>Editing Difficulty {editIndex + 1}:</strong>
            </div>
            <Select
              data={selectData}
              placeholder="Difficulty"
              {...form.getInputProps('select')}
              value={select}
              onChange={setSelect}
              required
            />
            <NumberInput
              label="Area size"
              defaultValue={typeof currentDifficulty === 'object' ? currentDifficulty?.areaSize : undefined}
              description="Skill check area size in degrees"
              disabled={select !== 'custom'}
              max={360}
              hideControls
              required={select === 'custom'}
              {...form.getInputProps('areaSize')}
            />
            <NumberInput
              label="Speed multiplier"
              description="Number the indicator speed will be multiplied by"
              disabled={select !== 'custom'}
              defaultValue={typeof currentDifficulty === 'object' ? currentDifficulty?.speedMultiplier : undefined}
              hideControls
              precision={2}
              required={select === 'custom'}
              {...form.getInputProps('speedMultiplier')}
            />
            <Button type="submit" uppercase variant="light">
              Update Difficulty
            </Button>
          </Stack>
        </form>
      </Stack>
    </Modal>
  );
};

export default HackDifficultyModal;
