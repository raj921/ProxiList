'use client';

import React from 'react';
import { useFormStatus } from 'react-dom';
import { useActionState } from 'react'; // Updated import
import { handleSmartSuggest } from '@/lib/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Lightbulb, Sparkles } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const initialState = {
  message: null,
  suggestions: null,
  errors: {},
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full bg-accent hover:bg-accent/90">
      {pending ? (
        <>
          <Sparkles className="h-4 w-4 mr-2 animate-spin" />
          Getting Suggestions...
        </>
      ) : (
        <>
          <Lightbulb className="h-4 w-4 mr-2" />
          Get Smart Suggestions
        </>
      )}
    </Button>
  );
}

export function SmartSuggestSection() {
  const [state, formAction] = useActionState(handleSmartSuggest, initialState); // Updated usage

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-xl flex items-center">
          <Sparkles className="h-5 w-5 mr-2 text-accent" />
          AI Smart Suggestions
        </CardTitle>
        <CardDescription>
          Get personalized item suggestions based on your location and past purchases.
        </CardDescription>
      </CardHeader>
      <form action={formAction}>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="location">Your Current Location / Nearby Store</Label>
            <Input
              id="location"
              name="location"
              placeholder="e.g., near FreshMart Downtown"
              required
              aria-describedby="location-error"
            />
            {state.errors?.location && (
              <p id="location-error" className="text-sm text-destructive mt-1">
                {state.errors.location.join(', ')}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="purchaseHistory">Past Purchases (Optional)</Label>
            <Textarea
              id="purchaseHistory"
              name="purchaseHistory"
              placeholder="e.g., apples, milk, bread, headphones"
              rows={3}
              aria-describedby="purchaseHistory-error"
            />
             {state.errors?.purchaseHistory && (
              <p id="purchaseHistory-error" className="text-sm text-destructive mt-1">
                {state.errors.purchaseHistory.join(', ')}
              </p>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <SubmitButton />
          {state.message && !state.suggestions && (
            <Alert variant={state.errors && Object.keys(state.errors).length > 0 ? "destructive" : "default"}>
              <AlertTitle>{state.errors && Object.keys(state.errors).length > 0 ? "Error" : "Info"}</AlertTitle>
              <AlertDescription>{state.message}</AlertDescription>
            </Alert>
          )}
        </CardFooter>
      </form>
      {state.suggestions && (
        <CardContent>
          <Alert variant="default" className="bg-primary/10 border-primary/30">
            <Lightbulb className="h-5 w-5 text-primary" />
            <AlertTitle className="text-primary font-semibold">Suggested Items</AlertTitle>
            <AlertDescription>
              <ul className="list-disc list-inside mt-2">
                {state.suggestions.split(',').map((item, index) => (
                  <li key={index} className="text-sm">{item.trim()}</li>
                ))}
              </ul>
              <p className="text-xs mt-2 text-muted-foreground">Consider adding these to your shopping list!</p>
            </AlertDescription>
          </Alert>
        </CardContent>
      )}
    </Card>
  );
}
