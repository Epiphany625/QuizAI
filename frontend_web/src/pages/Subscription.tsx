import React from 'react';
import useTokenValidation from '../hooks/useTokenValidation';
import { Shield, Check, Calendar, CreditCard, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Plan {
  price: string;
  period: string;
  features: string[];
}

interface Plans {
  free: Plan;
  premium: Plan;
}

export function Subscription() {
  useTokenValidation();
  const navigate = useNavigate();
  const currentPlan = 'free';
  const nextBillingDate = new Date('2024-03-01');

  const plans: Plans = {
    free: {
      price: '$0',
      period: 'forever',
      features: [
        'Generate up to 5 quizzes per month',
        'Basic question types',
        'Standard study materials upload'
      ]
    },
    premium: {
      price: '$9.99',
      period: 'month',
      features: [
        'Unlimited quiz generation',
        'Advanced question types',
        'Detailed answer explanations',
        'Unlimited study materials',
        'Access to mistake journal'
      ]
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Free Plan */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transform hover:scale-[1.02] transition-transform duration-300 flex flex-col">
            <div className="p-8 bg-gradient-to-r from-gray-100 to-gray-200 h-[180px]">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <Zap className="w-8 h-8 text-gray-600" />
                  <h2 className="text-2xl font-bold text-gray-900">Free Plan</h2>
                </div>
                {currentPlan === 'free' && (
                  <span className="px-4 py-1.5 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                    Current Plan
                  </span>
                )}
              </div>
              <div className="mt-2">
                <span className="text-4xl font-bold text-gray-900">{plans.free.price}</span>
                <span className="text-gray-600 ml-2">{plans.free.period}</span>
              </div>
            </div>

            <div className="p-8 border-b border-gray-200 flex-grow">
              <div className="space-y-4">
                {plans.free.features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <Check className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0" />
                    <span className="text-gray-600">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-8 mt-auto">
              {currentPlan === 'free' ? (
                <button disabled className="w-full px-8 py-3 bg-gray-100 text-gray-500 rounded-lg cursor-not-allowed text-lg font-medium">
                  Current Plan
                </button>
              ) : (
                <button className="w-full px-8 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-colors duration-300 text-lg font-medium">
                  Downgrade to Free
                </button>
              )}
            </div>
          </div>

          {/* Premium Plan */}
          <div className="bg-white rounded-xl shadow-lg border-2 border-blue-200 overflow-hidden transform hover:scale-[1.02] transition-transform duration-300 flex flex-col">
            <div className="p-8 bg-gradient-to-r from-blue-500 to-indigo-600 text-white h-[180px]">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <Shield className="w-8 h-8" />
                  <h2 className="text-2xl font-bold">Premium Plan</h2>
                </div>
                {currentPlan === 'premium' && (
                  <span className="px-4 py-1.5 bg-white/20 rounded-full text-sm font-medium">
                    Current Plan
                  </span>
                )}
              </div>
              <div className="mt-2">
                <span className="text-4xl font-bold">{plans.premium.price}</span>
                <span className="ml-2">per {plans.premium.period}</span>
              </div>
              {currentPlan === 'premium' && (
                <div className="flex items-center mt-4 text-white/90">
                  <Calendar className="w-5 h-5 mr-2" />
                  <span className="text-sm">Next billing: {nextBillingDate.toLocaleDateString()}</span>
                </div>
              )}
            </div>

            <div className="p-8 border-b border-gray-200 flex-grow">
              <div className="space-y-4">
                {plans.premium.features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-8 bg-gray-50 mt-auto">
              {currentPlan === 'premium' ? (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center text-gray-700">
                      <CreditCard className="w-5 h-5 mr-2" />
                      <span>Payment Method</span>
                    </div>
                    <button className="text-blue-600 hover:text-blue-700 font-medium">
                      Update
                    </button>
                  </div>

                  <div className="flex justify-between items-center">
                    <button className="px-6 py-3 text-red-600 hover:text-red-700 font-medium">
                      Cancel Subscription
                    </button>
                    <button className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 font-medium">
                      Manage Plan
                    </button>
                  </div>
                </div>
              ) : (
                <button className="w-full px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 text-lg font-medium">
                  Upgrade to Premium
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}