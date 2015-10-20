class SearchSuggestion

  MIN_QUERY_LENGTH = 2

  def self.seed
    $redis.flushall
    File.open(Rails.root.join('lib', '350k_words.txt')).each_line do |line|
      text = line.chop.downcase
      length = text.length
      # Don't bother indexing words longer than 7 characters until we are a few characters in
      start_point = length < 8 ? MIN_QUERY_LENGTH : MIN_QUERY_LENGTH + (length - 7)
      start_point.upto(length) do |n|
        prefix = text[0, n].downcase
        # Scores
        # Exact match = 5
        # 1 letter short = 4
        # 2 letters short = 3
        # etc... min is 1
        score = nil
        if prefix == text
          score = 5
        else
          diff = length - n
          score = [1, 5-diff].max
        end
        $redis.zadd "ss:#{prefix}", score, text
      end
    end
  end

  def self.terms_for(prefix)
    $redis.zrevrange "ss:#{prefix.downcase}", 0, 5
  end

end
