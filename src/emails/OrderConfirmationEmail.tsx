import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Button,
  Hr,
  Row,
  Column,
} from '@react-email/components'

interface OrderConfirmationEmailProps {
  orderId: string
  customerName: string
  customerEmail: string
  items: Array<{
    name: string
    quantity: number
    price: number
  }>
  total: number
  shippingAddress: {
    firstName: string
    lastName: string
    address: string
    city: string
    postalCode: string
    country: string
  }
}

export default function OrderConfirmationEmail({
  orderId,
  customerName,
  customerEmail,
  items,
  total,
  shippingAddress,
}: OrderConfirmationEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Order Confirmation - Aurée Luxury Eyewear</Preview>
      <Body style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f8f8f8' }}>
        <Container style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', backgroundColor: '#ffffff' }}>
          {/* Header */}
          <Section style={{ textAlign: 'center', padding: '20px 0' }}>
            <Heading style={{ fontSize: '32px', fontWeight: '300', letterSpacing: '0.15em', color: '#000000' }}>
              AURÉE
            </Heading>
            <Text style={{ fontSize: '14px', color: '#666666', marginTop: '10px' }}>
              Luxury Eyewear
            </Text>
          </Section>

          <Hr style={{ border: '1px solid #e0e0e0', margin: '20px 0' }} />

          {/* Order Confirmation */}
          <Section style={{ padding: '20px 0' }}>
            <Heading style={{ fontSize: '24px', fontWeight: '300', color: '#000000' }}>
              Order Confirmation
            </Heading>
            <Text style={{ fontSize: '16px', color: '#333333', marginTop: '10px' }}>
              Thank you for your order, {customerName}!
            </Text>
            <Text style={{ fontSize: '16px', color: '#333333', marginTop: '5px' }}>
              Order ID: <strong>{orderId}</strong>
            </Text>
          </Section>

          <Hr style={{ border: '1px solid #e0e0e0', margin: '20px 0' }} />

          {/* Order Items */}
          <Section style={{ padding: '20px 0' }}>
            <Heading style={{ fontSize: '18px', fontWeight: '300', color: '#000000' }}>
              Order Details
            </Heading>
            
            {items.map((item, index) => (
              <Row key={index} style={{ marginBottom: '15px' }}>
                <Column style={{ width: '70%' }}>
                  <Text style={{ fontSize: '16px', color: '#333333' }}>
                    {item.name}
                  </Text>
                  <Text style={{ fontSize: '14px', color: '#666666' }}>
                    Quantity: {item.quantity}
                  </Text>
                </Column>
                <Column style={{ width: '30%', textAlign: 'right' }}>
                  <Text style={{ fontSize: '16px', color: '#000000', fontWeight: '500' }}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </Text>
                </Column>
              </Row>
            ))}

            <Hr style={{ border: '1px solid #e0e0e0', margin: '20px 0' }} />

            <Row>
              <Column style={{ width: '70%' }}>
                <Text style={{ fontSize: '18px', color: '#333333' }}>
                  Total
                </Text>
              </Column>
              <Column style={{ width: '30%', textAlign: 'right' }}>
                <Text style={{ fontSize: '20px', color: '#000000', fontWeight: '600' }}>
                  ${total.toFixed(2)}
                </Text>
              </Column>
            </Row>
          </Section>

          <Hr style={{ border: '1px solid #e0e0e0', margin: '20px 0' }} />

          {/* Shipping Information */}
          <Section style={{ padding: '20px 0' }}>
            <Heading style={{ fontSize: '18px', fontWeight: '300', color: '#000000' }}>
              Shipping Information
            </Heading>
            <Text style={{ fontSize: '16px', color: '#333333', marginTop: '10px' }}>
              {shippingAddress.firstName} {shippingAddress.lastName}
            </Text>
            <Text style={{ fontSize: '16px', color: '#333333' }}>
              {shippingAddress.address}
            </Text>
            <Text style={{ fontSize: '16px', color: '#333333' }}>
              {shippingAddress.city}, {shippingAddress.postalCode}
            </Text>
            <Text style={{ fontSize: '16px', color: '#333333' }}>
              {shippingAddress.country}
            </Text>
            <Text style={{ fontSize: '16px', color: '#333333', marginTop: '10px' }}>
              Email: {customerEmail}
            </Text>
          </Section>

          <Hr style={{ border: '1px solid #e0e0e0', margin: '20px 0' }} />

          {/* Footer */}
          <Section style={{ padding: '20px 0', textAlign: 'center' }}>
            <Text style={{ fontSize: '14px', color: '#666666' }}>
              Thank you for choosing Aurée Luxury Eyewear
            </Text>
            <Text style={{ fontSize: '14px', color: '#666666', marginTop: '5px' }}>
              Your order will be processed within 1-2 business days.
            </Text>
            
            <Button
              href="https://glassysee.com"
              style={{
                backgroundColor: '#000000',
                color: '#ffffff',
                padding: '12px 24px',
                textDecoration: 'none',
                borderRadius: '4px',
                display: 'inline-block',
                marginTop: '20px',
                fontSize: '14px',
                letterSpacing: '0.05em',
              }}
            >
              Visit Our Store
            </Button>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}