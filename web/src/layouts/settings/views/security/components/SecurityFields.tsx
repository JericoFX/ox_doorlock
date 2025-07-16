import { Box, TextInput, Switch, Stack } from '@mantine/core';
import { useSetters, useStore } from '../../../../../store';
import HackDifficultyModal from './HackDifficultyModal';
import { useState } from 'react';

const SecurityFields: React.FC = () => {
  const keyItem = useStore((state) => state.keyItem);
  const alarmEnabled = useStore((state) => state.alarmEnabled);
  const hackDifficulty = useStore((state) => state.hackDifficulty);
  
  const setKeyItem = useSetters((setter) => setter.setKeyItem);
  const toggleCheckbox = useSetters((setter) => setter.toggleCheckbox);
  const setHackDifficulty = useSetters((setter) => setter.setHackDifficulty);

  const [difficultyModal, setDifficultyModal] = useState(false);

  const difficultyDisplay = hackDifficulty.map(diff => 
    typeof diff === 'string' ? diff : `custom(${diff.areaSize}°, ${diff.speedMultiplier}x)`
  ).join(', ');

  return (
    <Box>
      <Stack>
        <TextInput
          label="Key Item"
          placeholder="Enter item name"
          value={keyItem || ''}
          onChange={(e) => setKeyItem(e.target.value)}
          description="Item required to open the door"
        />

        <Switch
          label="Alarm Enabled"
          checked={alarmEnabled || false}
          onChange={() => toggleCheckbox('alarmEnabled')}
          description="Enable alarm system that can be hacked"
        />

        {alarmEnabled && (
          <Box>
            <TextInput
              label="Hack Difficulty"
              placeholder="Click to configure"
              value={difficultyDisplay}
              onClick={() => setDifficultyModal(true)}
              readOnly
              description="Difficulty settings for hacking the alarm"
            />
          </Box>
        )}
      </Stack>

      <HackDifficultyModal
        opened={difficultyModal}
        onClose={() => setDifficultyModal(false)}
        difficulty={hackDifficulty}
        setDifficulty={setHackDifficulty}
        title="Hack Difficulty"
      />
    </Box>
  );
};

export default SecurityFields;
