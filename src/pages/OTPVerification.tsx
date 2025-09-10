import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { ChefHat, Shield } from 'lucide-react';

const OTPVerification = () => {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Get registration data from localStorage
      const registrationData = localStorage.getItem('nsutcater_registration');
      
      if (!registrationData) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Registration data not found. Please register again.",
        });
        navigate('/register');
        return;
      }

      const userData = JSON.parse(registrationData);
      
      // Accept any OTP (no validation as requested)
      if (otp.trim()) {
        const success = await register(userData);
        
        if (success) {
          // Clear registration data
          localStorage.removeItem('nsutcater_registration');
          
          toast({
            title: "Account Created Successfully",
            description: `Welcome to NsutCater, ${userData.name}!`,
          });
          
          navigate('/dashboard');
        } else {
          toast({
            variant: "destructive",
            title: "Registration Failed",
            description: "Something went wrong. Please try again.",
          });
        }
      } else {
        toast({
          variant: "destructive",
          title: "Invalid OTP",
          description: "Please enter a valid OTP.",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-primary/20 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center">
            <Shield className="w-8 h-8 text-primary-foreground" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold text-primary">Verify OTP</CardTitle>
            <CardDescription className="text-base">
              Enter the OTP sent to your mobile number
            </CardDescription>
          </div>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="otp" className="text-sm font-medium">OTP Code</Label>
              <Input
                id="otp"
                type="text"
                placeholder="Enter 6-digit OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="text-center text-lg tracking-widest"
                maxLength={6}
                required
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full" 
              size="lg"
              disabled={loading}
            >
              {loading ? 'Verifying...' : 'Verify OTP'}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Didn't receive OTP? 
              <button className="ml-1 text-primary hover:underline">
                Resend OTP
              </button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OTPVerification;