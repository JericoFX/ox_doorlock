import { Stack, Text } from '@mantine/core';
import SecurityFields from './components/SecurityFields';

const SecurityView: React.FC = () => {
  return (
    <Stack>
      <Text size="lg" weight={500}>
        Security Settings
      </Text>
      <SecurityFields />
    </Stack>
  );
};

export default SecurityView;
