import React, { useState } from 'react';
import {
  Palette, Type, Layout, MousePointer, Zap,
  CheckCircle, XCircle, AlertTriangle, Info,
  Loader, Sparkles, TrendingUp, Heart
} from 'lucide-react';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Alert from '../../components/ui/Alert';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Checkbox from '../../components/ui/Checkbox';
import Radio from '../../components/ui/Radio';
import Switch from '../../components/ui/Switch';
import Textarea from '../../components/ui/Textarea';
import Tooltip from '../../components/ui/Tooltip';
import Modal from '../../components/ui/Modal';
import Progress, { CircularProgress, ProgressSteps } from '../../components/ui/Progress';
import Spinner from '../../components/ui/Spinner';
import ThemeToggle from '../../components/ui/ThemeToggle';
import PageTransition from '../../components/animations/PageTransition';

const ComponentsShowcase: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [switchChecked, setSwitchChecked] = useState(false);
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [radioValue, setRadioValue] = useState('option1');
  const [selectValue, setSelectValue] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [textareaValue, setTextareaValue] = useState('');

  return (
    <PageTransition variant="fade">
      <div style={{
        minHeight: '100vh',
        backgroundColor: 'var(--color-background)',
        padding: 'var(--space-8)',
      }}>
        {/* Header */}
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          marginBottom: 'var(--space-12)',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 'var(--space-4)',
          }}>
            <div>
              <h1 style={{
                fontSize: 'var(--font-size-4xl)',
                fontWeight: 'var(--font-weight-bold)',
                color: 'var(--color-text-primary)',
                marginBottom: 'var(--space-2)',
                fontFamily: 'var(--font-display)',
              }}>
                <Sparkles size={40} style={{ display: 'inline', marginRight: '1rem', color: 'var(--color-primary)' }} />
                Design System Showcase
              </h1>
              <p style={{
                fontSize: 'var(--font-size-lg)',
                color: 'var(--color-text-secondary)',
                fontFamily: 'var(--font-body)',
              }}>
                Bibliothèque de composants modernes pour FNE Connect
              </p>
            </div>
            <ThemeToggle variant="dropdown" showLabel />
          </div>
        </div>

        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          {/* Buttons Section */}
          <Card style={{ marginBottom: 'var(--space-8)' }}>
            <h2 style={{
              fontSize: 'var(--font-size-2xl)',
              fontWeight: 'var(--font-weight-bold)',
              color: 'var(--color-text-primary)',
              marginBottom: 'var(--space-6)',
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-3)',
            }}>
              <MousePointer size={28} color="var(--color-primary)" />
              Buttons
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
              {/* Variants */}
              <div>
                <h3 style={{ fontSize: 'var(--font-size-lg)', marginBottom: 'var(--space-3)', color: 'var(--color-text-secondary)' }}>
                  Variants
                </h3>
                <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
                  <Button variant="solid" color="primary">Primary</Button>
                  <Button variant="solid" color="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="solid" color="error">Danger</Button>
                  <Button variant="solid" color="success">Success</Button>
                </div>
              </div>

              {/* Sizes */}
              <div>
                <h3 style={{ fontSize: 'var(--font-size-lg)', marginBottom: 'var(--space-3)', color: 'var(--color-text-secondary)' }}>
                  Sizes
                </h3>
                <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center', flexWrap: 'wrap' }}>
                  <Button size="sm">Small</Button>
                  <Button size="md">Medium</Button>
                  <Button size="lg">Large</Button>
                </div>
              </div>

              {/* States */}
              <div>
                <h3 style={{ fontSize: 'var(--font-size-lg)', marginBottom: 'var(--space-3)', color: 'var(--color-text-secondary)' }}>
                  States
                </h3>
                <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
                  <Button loading>Loading</Button>
                  <Button disabled>Disabled</Button>
                  <Button fullWidth>Full Width</Button>
                </div>
              </div>

              {/* With Icons */}
              <div>
                <h3 style={{ fontSize: 'var(--font-size-lg)', marginBottom: 'var(--space-3)', color: 'var(--color-text-secondary)' }}>
                  With Icons
                </h3>
                <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
                  <Button leftIcon={<CheckCircle size={18} />}>With Left Icon</Button>
                  <Button rightIcon={<TrendingUp size={18} />}>With Right Icon</Button>
                  <Button leftIcon={<Heart size={18} />} variant="solid" color="error">Like</Button>
                </div>
              </div>
            </div>
          </Card>

          {/* Badges Section */}
          <Card style={{ marginBottom: 'var(--space-8)' }}>
            <h2 style={{
              fontSize: 'var(--font-size-2xl)',
              fontWeight: 'var(--font-weight-bold)',
              color: 'var(--color-text-primary)',
              marginBottom: 'var(--space-6)',
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-3)',
            }}>
              <Palette size={28} color="var(--color-primary)" />
              Badges
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
              {/* Variants */}
              <div>
                <h3 style={{ fontSize: 'var(--font-size-lg)', marginBottom: 'var(--space-3)', color: 'var(--color-text-secondary)' }}>
                  Variants
                </h3>
                <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
                  <Badge variant="primary">Primary</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                  <Badge variant="success">Success</Badge>
                  <Badge variant="warning">Warning</Badge>
                  <Badge variant="error">Error</Badge>
                  <Badge variant="info">Info</Badge>
                </div>
              </div>

              {/* Sizes */}
              <div>
                <h3 style={{ fontSize: 'var(--font-size-lg)', marginBottom: 'var(--space-3)', color: 'var(--color-text-secondary)' }}>
                  Sizes
                </h3>
                <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center', flexWrap: 'wrap' }}>
                  <Badge size="sm">Small</Badge>
                  <Badge size="md">Medium</Badge>
                  <Badge size="lg">Large</Badge>
                </div>
              </div>

              {/* With Icons */}
              <div>
                <h3 style={{ fontSize: 'var(--font-size-lg)', marginBottom: 'var(--space-3)', color: 'var(--color-text-secondary)' }}>
                  With Icons
                </h3>
                <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
                  <Badge variant="success" icon={<CheckCircle size={14} />}>Verified</Badge>
                  <Badge variant="warning" icon={<AlertTriangle size={14} />}>Warning</Badge>
                  <Badge variant="error" icon={<XCircle size={14} />}>Error</Badge>
                </div>
              </div>
            </div>
          </Card>

          {/* Alerts Section */}
          <Card style={{ marginBottom: 'var(--space-8)' }}>
            <h2 style={{
              fontSize: 'var(--font-size-2xl)',
              fontWeight: 'var(--font-weight-bold)',
              color: 'var(--color-text-primary)',
              marginBottom: 'var(--space-6)',
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-3)',
            }}>
              <Info size={28} color="var(--color-primary)" />
              Alerts
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              <Alert variant="success" title="Success!">
                Your changes have been saved successfully.
              </Alert>
              <Alert variant="warning" title="Warning">
                Please review your information before submitting.
              </Alert>
              <Alert variant="error" title="Error">
                Something went wrong. Please try again.
              </Alert>
              <Alert variant="info" title="Information">
                This is an informational message.
              </Alert>
            </div>
          </Card>

          {/* Form Inputs Section */}
          <Card style={{ marginBottom: 'var(--space-8)' }}>
            <h2 style={{
              fontSize: 'var(--font-size-2xl)',
              fontWeight: 'var(--font-weight-bold)',
              color: 'var(--color-text-primary)',
              marginBottom: 'var(--space-6)',
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-3)',
            }}>
              <Type size={28} color="var(--color-primary)" />
              Form Inputs
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-6)' }}>
              {/* Input */}
              <div>
                <Input
                  label="Email"
                  type="email"
                  placeholder="your@email.com"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  helperText="We'll never share your email"
                />
              </div>

              {/* Select */}
              <div>
                <Select
                  label="Country"
                  value={selectValue}
                  onChange={(e) => setSelectValue(e.target.value)}
                  options={[
                    { value: '', label: 'Select a country' },
                    { value: 'fr', label: 'France' },
                    { value: 'be', label: 'Belgium' },
                    { value: 'ch', label: 'Switzerland' },
                  ]}
                />
              </div>

              {/* Textarea */}
              <div>
                <Textarea
                  label="Message"
                  placeholder="Enter your message..."
                  value={textareaValue}
                  onChange={(e) => setTextareaValue(e.target.value)}
                  rows={4}
                />
              </div>
            </div>

            <div style={{ marginTop: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              {/* Checkbox */}
              <Checkbox
                checked={checkboxChecked}
                onChange={(e) => setCheckboxChecked(e.target.checked)}
                label="I agree to the terms and conditions"
              />

              {/* Radio */}
              <div>
                <p style={{ marginBottom: 'var(--space-2)', fontWeight: 'var(--font-weight-medium)', color: 'var(--color-text-primary)' }}>
                  Choose an option:
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                  <Radio
                    name="options"
                    value="option1"
                    checked={radioValue === 'option1'}
                    onChange={(e) => setRadioValue(e.target.value)}
                    label="Option 1"
                  />
                  <Radio
                    name="options"
                    value="option2"
                    checked={radioValue === 'option2'}
                    onChange={(e) => setRadioValue(e.target.value)}
                    label="Option 2"
                  />
                  <Radio
                    name="options"
                    value="option3"
                    checked={radioValue === 'option3'}
                    onChange={(e) => setRadioValue(e.target.value)}
                    label="Option 3"
                  />
                </div>
              </div>

              {/* Switch */}
              <Switch
                checked={switchChecked}
                onChange={(e) => setSwitchChecked(e.target.checked)}
                label="Enable notifications"
              />
            </div>
          </Card>

          {/* Progress Section */}
          <Card style={{ marginBottom: 'var(--space-8)' }}>
            <h2 style={{
              fontSize: 'var(--font-size-2xl)',
              fontWeight: 'var(--font-weight-bold)',
              color: 'var(--color-text-primary)',
              marginBottom: 'var(--space-6)',
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-3)',
            }}>
              <TrendingUp size={28} color="var(--color-primary)" />
              Progress Indicators
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
              {/* Linear Progress */}
              <div>
                <h3 style={{ fontSize: 'var(--font-size-lg)', marginBottom: 'var(--space-3)', color: 'var(--color-text-secondary)' }}>
                  Linear Progress
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                  <Progress value={25} showLabel color="primary" />
                  <Progress value={50} showLabel color="success" />
                  <Progress value={75} showLabel color="warning" />
                  <Progress value={100} showLabel color="error" />
                </div>
              </div>

              {/* Circular Progress */}
              <div>
                <h3 style={{ fontSize: 'var(--font-size-lg)', marginBottom: 'var(--space-3)', color: 'var(--color-text-secondary)' }}>
                  Circular Progress
                </h3>
                <div style={{ display: 'flex', gap: 'var(--space-6)', flexWrap: 'wrap' }}>
                  <CircularProgress value={25} color="primary" />
                  <CircularProgress value={50} color="success" />
                  <CircularProgress value={75} color="warning" />
                  <CircularProgress value={100} color="error" />
                </div>
              </div>

              {/* Progress Steps */}
              <div>
                <h3 style={{ fontSize: 'var(--font-size-lg)', marginBottom: 'var(--space-3)', color: 'var(--color-text-secondary)' }}>
                  Progress Steps
                </h3>
                <ProgressSteps
                  steps={['Account', 'Personal Info', 'Payment', 'Confirmation']}
                  currentStep={1}
                  color="primary"
                />
              </div>
            </div>
          </Card>

          {/* Loading States Section */}
          <Card style={{ marginBottom: 'var(--space-8)' }}>
            <h2 style={{
              fontSize: 'var(--font-size-2xl)',
              fontWeight: 'var(--font-weight-bold)',
              color: 'var(--color-text-primary)',
              marginBottom: 'var(--space-6)',
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-3)',
            }}>
              <Loader size={28} color="var(--color-primary)" />
              Loading States
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
              {/* Spinner Variants */}
              <div>
                <h3 style={{ fontSize: 'var(--font-size-lg)', marginBottom: 'var(--space-3)', color: 'var(--color-text-secondary)' }}>
                  Spinner Variants
                </h3>
                <div style={{ display: 'flex', gap: 'var(--space-6)', alignItems: 'center', flexWrap: 'wrap' }}>
                  <Spinner size="sm" />
                  <Spinner size="md" />
                  <Spinner size="lg" />
                  <Spinner size="md" color="secondary" />
                  <Spinner size="md" color="success" />
                </div>
              </div>

              {/* Spinner Colors */}
              <div>
                <h3 style={{ fontSize: 'var(--font-size-lg)', marginBottom: 'var(--space-3)', color: 'var(--color-text-secondary)' }}>
                  Spinner Colors
                </h3>
                <div style={{ display: 'flex', gap: 'var(--space-6)', alignItems: 'center', flexWrap: 'wrap' }}>
                  <Spinner color="primary" />
                  <Spinner color="secondary" />
                  <Spinner color="success" />
                  <Spinner color="warning" />
                  <Spinner color="error" />
                </div>
              </div>
            </div>
          </Card>

          {/* Interactive Components Section */}
          <Card style={{ marginBottom: 'var(--space-8)' }}>
            <h2 style={{
              fontSize: 'var(--font-size-2xl)',
              fontWeight: 'var(--font-weight-bold)',
              color: 'var(--color-text-primary)',
              marginBottom: 'var(--space-6)',
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-3)',
            }}>
              <Zap size={28} color="var(--color-primary)" />
              Interactive Components
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
              {/* Tooltips */}
              <div>
                <h3 style={{ fontSize: 'var(--font-size-lg)', marginBottom: 'var(--space-3)', color: 'var(--color-text-secondary)' }}>
                  Tooltips
                </h3>
                <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
                  <Tooltip content="Tooltip on top" position="top">
                    <Button variant="outline">Top</Button>
                  </Tooltip>
                  <Tooltip content="Tooltip on bottom" position="bottom">
                    <Button variant="outline">Bottom</Button>
                  </Tooltip>
                  <Tooltip content="Tooltip on left" position="left">
                    <Button variant="outline">Left</Button>
                  </Tooltip>
                  <Tooltip content="Tooltip on right" position="right">
                    <Button variant="outline">Right</Button>
                  </Tooltip>
                </div>
              </div>

              {/* Modal */}
              <div>
                <h3 style={{ fontSize: 'var(--font-size-lg)', marginBottom: 'var(--space-3)', color: 'var(--color-text-secondary)' }}>
                  Modal
                </h3>
                <Button onClick={() => setIsModalOpen(true)}>Open Modal</Button>
                <Modal
                  isOpen={isModalOpen}
                  onClose={() => setIsModalOpen(false)}
                  title="Example Modal"
                  size="md"
                >
                  <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-4)' }}>
                    This is an example modal dialog. You can put any content here.
                  </p>
                  <div style={{ display: 'flex', gap: 'var(--space-3)', justifyContent: 'flex-end' }}>
                    <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                      Cancel
                    </Button>
                    <Button variant="solid" color="primary" onClick={() => setIsModalOpen(false)}>
                      Confirm
                    </Button>
                  </div>
                </Modal>
              </div>
            </div>
          </Card>

          {/* Theme Toggle Section */}
          <Card style={{ marginBottom: 'var(--space-8)' }}>
            <h2 style={{
              fontSize: 'var(--font-size-2xl)',
              fontWeight: 'var(--font-weight-bold)',
              color: 'var(--color-text-primary)',
              marginBottom: 'var(--space-6)',
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-3)',
            }}>
              <Layout size={28} color="var(--color-primary)" />
              Theme Toggle
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
              {/* Theme Toggle Variants */}
              <div>
                <h3 style={{ fontSize: 'var(--font-size-lg)', marginBottom: 'var(--space-3)', color: 'var(--color-text-secondary)' }}>
                  Variants
                </h3>
                <div style={{ display: 'flex', gap: 'var(--space-6)', alignItems: 'center', flexWrap: 'wrap' }}>
                  <div>
                    <p style={{ fontSize: 'var(--font-size-sm)', marginBottom: 'var(--space-2)', color: 'var(--color-text-secondary)' }}>Icon</p>
                    <ThemeToggle variant="icon" />
                  </div>
                  <div>
                    <p style={{ fontSize: 'var(--font-size-sm)', marginBottom: 'var(--space-2)', color: 'var(--color-text-secondary)' }}>Button</p>
                    <ThemeToggle variant="button" showLabel />
                  </div>
                  <div>
                    <p style={{ fontSize: 'var(--font-size-sm)', marginBottom: 'var(--space-2)', color: 'var(--color-text-secondary)' }}>Dropdown</p>
                    <ThemeToggle variant="dropdown" showLabel />
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </PageTransition>
  );
};

export default ComponentsShowcase;
