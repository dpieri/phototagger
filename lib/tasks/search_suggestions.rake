namespace :search_suggestions do

  desc 'Generate tag autocomplete suggestions'
  task index: :environment do
    SearchSuggestion.seed
  end

end
