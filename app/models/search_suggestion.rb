class SearchSuggestion

  def self.seed
    $redis.flushall
    File.open(Rails.root.join('lib', 'common_words.txt')).each_line do |line|
      text = line.chop
      1.upto(text.length) do |n|
        prefix = text[0, n]
        # Score is 2 for an exact match, 1 for everything else
        score = n == text.length ? 2 : 1
        $redis.zadd "search-suggestions:#{prefix.downcase}", score, text.downcase
      end
    end
  end

  def self.terms_for(prefix)
    $redis.zrevrange "search-suggestions:#{prefix.downcase}", 0, 5
  end

end
