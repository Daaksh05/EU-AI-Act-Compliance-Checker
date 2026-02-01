import React from 'react';

interface ExplanationProps {
  title: string;
  content: string;
  icon?: React.ReactNode;
}

export function ExplanationCard({ title, content, icon }: ExplanationProps) {
  return (
    <div className="section-card">
      <div className="flex items-start gap-3">
        {icon && <div className="text-eu-blue flex-shrink-0">{icon}</div>}
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900 mb-2">{title}</h4>
          <p className="text-sm text-gray-700 leading-relaxed">{content}</p>
        </div>
      </div>
    </div>
  );
}

interface BadgeProps {
  label: string;
  color: 'green' | 'yellow' | 'red' | 'blue';
  icon?: React.ReactNode;
}

export function Badge({ label, color, icon }: BadgeProps) {
  const colors = {
    green: 'bg-green-100 text-green-800 border border-green-300',
    yellow: 'bg-yellow-100 text-yellow-800 border border-yellow-300',
    red: 'bg-red-100 text-red-800 border border-red-300',
    blue: 'bg-blue-100 text-blue-800 border border-blue-300',
  };

  return (
    <span className={`badge ${colors[color]} inline-flex items-center gap-2`}>
      {icon}
      {label}
    </span>
  );
}

interface LoadingSpinnerProps {
  message?: string;
}

export function LoadingSpinner({ message }: LoadingSpinnerProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="w-12 h-12 border-4 border-gray-200 border-t-eu-blue rounded-full animate-spin" />
      {message && <p className="text-gray-600">{message}</p>}
    </div>
  );
}

interface ErrorAlertProps {
  message: string;
  onDismiss?: () => void;
}

export function ErrorAlert({ message, onDismiss }: ErrorAlertProps) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start justify-between gap-3">
      <div className="flex items-start gap-3">
        <span className="text-red-600 font-bold">!</span>
        <p className="text-sm text-red-700">{message}</p>
      </div>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="text-red-600 hover:text-red-800 font-bold"
        >
          ×
        </button>
      )}
    </div>
  );
}

interface SuccessAlertProps {
  message: string;
}

export function SuccessAlert({ message }: SuccessAlertProps) {
  return (
    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
      <p className="text-sm text-green-700 flex items-center gap-2">
        <span className="font-bold">✓</span>
        {message}
      </p>
    </div>
  );
}
