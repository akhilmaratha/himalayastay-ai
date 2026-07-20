import React from 'react';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';

export function ReviewInput({ reviewText, setReviewText, onAnalyze, onClear, isLoading }) {
  const isValidLength = reviewText.length >= 20 && reviewText.length <= 2000;
  const showValidation = reviewText.length > 0 && !isValidLength;

  return (
    <div className="mb-xl bg-surface-container-lowest rounded-xl p-md md:p-lg border border-outline-variant shadow-sm">
      <div className="mb-md">
        <h2 className="font-display-md text-display-md text-primary mb-xs">AI Guest Review Analyzer</h2>
        <p className="font-body-md text-on-surface-variant">Paste a guest review below to receive AI-powered insights and a suggested professional owner response.</p>
      </div>

      <div className="space-y-sm">
        <label htmlFor="review-input" className="font-label-md text-on-surface">Guest Review</label>
        <textarea
          id="review-input"
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          disabled={isLoading}
          placeholder='Example: "The room was beautiful and clean. The staff were friendly, but the WiFi connection was slow and breakfast options were limited."'
          className={`flex min-h-[150px] w-full rounded-md border bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
            showValidation ? 'border-error focus-visible:ring-error' : 'border-input'
          }`}
        />
        
        <div className="flex justify-between items-center mt-2">
          <div className="flex flex-col">
            <span className={`font-label-sm ${showValidation ? 'text-error' : 'text-on-surface-variant'}`}>
              {reviewText.length} / 2000
            </span>
            {showValidation && (
              <span className="font-label-sm text-error mt-1">Review must be between 20 and 2000 characters.</span>
            )}
          </div>
          
          <div className="flex gap-sm">
            <Button 
              variant="outline" 
              onClick={onClear} 
              disabled={isLoading || reviewText.length === 0}
            >
              Clear
            </Button>
            <Button 
              onClick={onAnalyze} 
              disabled={isLoading || !isValidLength}
              className="min-w-[140px]"
            >
              {isLoading ? (
                <>
                  <Spinner className="mr-2 h-4 w-4 text-on-primary" />
                  Analyzing Review...
                </>
              ) : (
                'Analyze Review'
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
