
import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ArrowLeft, CreditCard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Checkout() {
  const { items, getTotalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    if (paymentMethod === 'paypal') {
      // Simulate PayPal payment processing
      console.log('Processing PayPal payment...');
      setTimeout(() => {
        clearCart();
        setIsProcessing(false);
        navigate('/order-success');
      }, 2000);
    } else {
      // Simulate card payment processing
      console.log('Processing card payment...');
      setTimeout(() => {
        clearCart();
        setIsProcessing(false);
        navigate('/order-success');
      }, 2000);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="max-w-md mx-auto pt-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-muted-foreground">Your cart is empty</p>
              <Button onClick={() => navigate('/')} className="mt-4">
                Continue Shopping
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-2xl mx-auto">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Button>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {items.map((item) => (
                <div key={item.product.id} className="flex items-center gap-3">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-sm">{item.product.name}</p>
                    <p className="text-sm text-muted-foreground">
                      ${item.product.price} x {item.quantity}
                    </p>
                  </div>
                  <p className="font-medium">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
              <div className="border-t pt-4">
                <div className="flex justify-between items-center font-bold">
                  <span>Total</span>
                  <span>${getTotalPrice().toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Checkout Form */}
          <Card>
            <CardHeader>
              <CardTitle>Checkout</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Shipping Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Shipping Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" required />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" required />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" required />
                  </div>
                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" required />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input id="city" required />
                    </div>
                    <div>
                      <Label htmlFor="zipCode">ZIP Code</Label>
                      <Input id="zipCode" required />
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Payment Method</h3>
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    <div className="flex items-center space-x-2 p-4 border rounded-lg">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer flex-1">
                        <CreditCard className="h-5 w-5" />
                        Credit/Debit Card
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-4 border rounded-lg">
                      <RadioGroupItem value="paypal" id="paypal" />
                      <Label htmlFor="paypal" className="flex items-center gap-2 cursor-pointer flex-1">
                        <div className="w-5 h-5 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">
                          P
                        </div>
                        PayPal
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Payment Details */}
                {paymentMethod === 'card' && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Payment Details</h3>
                    <div>
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input id="cardNumber" placeholder="1234 5678 9012 3456" required />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiryDate">Expiry Date</Label>
                        <Input id="expiryDate" placeholder="MM/YY" required />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input id="cvv" placeholder="123" required />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'paypal' && (
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-800">
                      You will be redirected to PayPal to complete your payment securely.
                    </p>
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isProcessing}
                >
                  {isProcessing 
                    ? 'Processing...' 
                    : paymentMethod === 'paypal' 
                      ? `Pay with PayPal - $${getTotalPrice().toFixed(2)}`
                      : `Place Order - $${getTotalPrice().toFixed(2)}`
                  }
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
