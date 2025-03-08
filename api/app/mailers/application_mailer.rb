class ApplicationMailer < ActionMailer::Base
  default from: ENV['EMAIL_FROM'] || 'noreply@cryptoportfolio.com'
  layout "mailer"
end
