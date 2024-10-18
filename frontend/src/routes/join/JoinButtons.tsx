import {
  Button,
  DropdownMenu,
  DropdownToggle,
  Form,
  FormGroup,
  Input,
  Label,
  Spinner,
  UncontrolledDropdown,
} from 'reactstrap';
import './JoinButtons.css';
import { useState } from 'react';
import { useJoinContext } from '../../contexts/Join.context';
import { useEmitterOn } from '../../util/events';

export const JoinButtons = () => {
  const { ee } = useJoinContext();

  const [showStarted, setShowStarted] = useState(false);
  const [showFull, setShowFull] = useState(false);
  const [showPassword, setShowPassword] = useState(true);

  const [refreshing, setRefreshing] = useState(false);

  useEmitterOn(ee, 'refresh', () => setRefreshing(true));
  useEmitterOn(ee, 'refreshed', () => setRefreshing(false));

  return (
    <>
      <UncontrolledDropdown className="refresh-group" group direction="end">
        <Button
          color="primary"
          outline
          disabled={refreshing}
          onClick={() =>
            ee.emit('refresh', { showStarted, showFull, showPassword })
          }
        >
          {refreshing && <Spinner size="sm" />} Refresh
        </Button>
        <DropdownToggle caret color="primary" outline disabled={refreshing} />
        <DropdownMenu>
          <div onClick={() => {}} className="refresh-menu">
            <Form>
              <FormGroup switch>
                <Input
                  type="switch"
                  role="switch"
                  checked={showStarted}
                  onChange={() => setShowStarted(!showStarted)}
                />
                <Label check>Show started games</Label>
              </FormGroup>
              <FormGroup switch>
                <Input
                  type="switch"
                  role="switch"
                  checked={showFull}
                  onChange={() => setShowFull(!showFull)}
                />
                <Label check>Show full games</Label>
              </FormGroup>
              <FormGroup switch>
                <Input
                  type="switch"
                  role="switch"
                  checked={showPassword}
                  onChange={() => setShowPassword(!showPassword)}
                />
                <Label check>Show games with password</Label>
              </FormGroup>
            </Form>
          </div>
        </DropdownMenu>
      </UncontrolledDropdown>
      <Button color="primary" outline onClick={() => ee.emit('create')}>
        Create
      </Button>
    </>
  );
};
